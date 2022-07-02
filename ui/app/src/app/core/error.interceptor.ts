import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UiStateService } from './ui-state.service';
import { DialogService } from '../shared/dialog.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private uiState:UiStateService, private dialog:DialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = this.addTokenHeader(request);
        this.uiState.startBackendAction(String(request.urlWithParams));
        return this.handleRequest(authReq, next, true);
    }

    private handleRequest(request: HttpRequest<any>, next: HttpHandler, canTokenRefresh:boolean): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((evt) => {
                // console.log("ANOTHER EVENT TAP !!!");
                // console.log(evt);
                if (evt instanceof HttpResponse) {
                    // console.log("STOOOP BACKEND ACTION TAP !!!");
                    // console.log(evt);
                    this.uiState.endBackendAction(String(evt.url));
                }
            }),
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 && this.authService.currentUserValue && canTokenRefresh) {
                        if (!request.url.endsWith('api/token/refresh/')) {
                            return this.handleTokenRefresh(request, next);
                        } else {
                            this.isRefreshing = false;
                            this.authService.logout();
                            console.log("LOGOUT !");
                        }
                    } else {
                        this.handleError(error);
                    }
                }
                // console.log("STOOOP BACKEND ACTION ERROR !!!");
                // console.log(error);
                this.uiState.endBackendAction(String(error.url));
                return throwError(() => error);
            })
        );
    }

    private handleTokenRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.access);

                    console.log("Next request...");
                    return this.handleRequest(this.addTokenHeader(request), next, false);
                }),
                catchError((error) => {
                    console.log(error);
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        this.isRefreshing = false;
                        this.authService.logout();
                        this.uiState.endAllBackendAction();
                        console.log("LOGOUT !");
                    }
                    return throwError(() => error);
                })
            );
        }
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => {
                return this.handleRequest(this.addTokenHeader(request), next, false);
            })
        );
    }

    private addTokenHeader(request: HttpRequest<any>) {
        // add authorization header with jwt token if available
        let token = this.authService.getToken();
        if (token && request.url.startsWith(environment.apiUrl) && !request.url.endsWith('api/token/refresh/') && !request.url.endsWith('api/token/')) {
            return request.clone({
                headers: request.headers.set(TOKEN_HEADER_KEY, `JWT ${token}`)
            });
        } else {
            return request;
        }

    }

    private handleError(error:HttpErrorResponse) {
        console.error(error);
        let title = "Error " + error.status + " " + error.statusText;
        let message = "";
        if (error.error?.code == "protected_error") {
            message = (error.error?.detail || "");
        } else if (error.error?.code == "import_error") {
            message = (error.error?.detail || "") + " Error : " + (error.error?.error?.type || "") + " : " + (error.error?.error?.message || "");
        } else if (error?.status == 403) {
            message = "Autorisation requise. Des droits supplémentaires sont nécessaires."
        } else if (error?.status == 500) {
            message = "Une erreur serveur est survenue."
        } else if (typeof error.error === 'string') {
            message = error.error;
        } else if (error?.error?.detail) {
            message = error?.error?.detail
        } else if (error.error?.error) {
            message = (error.error?.detail || "") + " Error : " + (error.error?.error?.type || "") + " : " + (error.error?.error?.message || "");
        } else {
            message = error.message;
        }
        this.dialog.alert(title, message);
    }
}

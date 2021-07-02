import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
                this.router.navigate(['/login']);
                // location.reload(true);
            }
            if (err.status === 403) {
                // auto logout if 403 response returned from api
                // this.router.navigate(['/login']);
                // location.reload(true);
                console.error(err.message);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
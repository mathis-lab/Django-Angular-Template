import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        console.log(request.url);
        if (currentUser && currentUser.token && request.url.startsWith(environment.apiUrl)) {
            console.log(`JWT ${currentUser.token}`);
            request = request.clone({
                setHeaders: {
                    Authorization: `JWT ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
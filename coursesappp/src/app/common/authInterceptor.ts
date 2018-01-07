import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthorizationService } from '../services/authorization.service';
import { Observable } from 'rxjs/Observable';
import { AuthorizationTokenService } from '../services/authToken.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthorizationTokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const authHeader = this.auth.getAuthorizationToken();
        // Clone the request to add the new header.
        // const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
        // const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
        // Pass on the cloned request instead of the original request.

        const authReq = req.clone({
            setHeaders: {
                Authorization: `${this.auth.getAuthorizationToken()}`
            }
        });
        //   return next.handle(request);

        return next.handle(authReq);
    }
}

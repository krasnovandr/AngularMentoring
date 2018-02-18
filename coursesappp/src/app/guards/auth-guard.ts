import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthorizationTokenService } from '../services/authToken.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthorizationTokenService, private navigateRouter: Router) {

    }
    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.navigateRouter.navigate(['login']);
    }
}

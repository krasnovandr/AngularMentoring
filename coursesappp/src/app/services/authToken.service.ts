import { Injectable } from '@angular/core';


@Injectable()
export class AuthorizationTokenService {
    private storageKey = 'currentUserToken';

    public getAuthorizationToken(): string {
        return localStorage.getItem(this.storageKey);
    }

    public setAuthorizationToken(token: string): any {
        localStorage.setItem(this.storageKey, token);
    }

    public removeAuthorizationToken() {
        localStorage.removeItem(this.storageKey);
    }

    public isAuthenticated(): boolean {
        const reuslt = localStorage.getItem(this.storageKey);

        return reuslt !== null;
    }
}

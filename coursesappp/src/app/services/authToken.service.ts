import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthorizationTokenService {
    private storageKey = 'currentUserToken';
    public userToken: BehaviorSubject<string> = new BehaviorSubject<string>(this.getAuthorizationToken());

    public getAuthorizationToken(): string {
        return localStorage.getItem(this.storageKey);
    }

    public setAuthorizationToken(token: string): any {
        localStorage.setItem(this.storageKey, token);
        this.userToken.next(token);
    }

    public removeAuthorizationToken() {
        localStorage.removeItem(this.storageKey);
        this.userToken.next(null);
    }

    public isAuthenticated(): boolean {
        const reuslt = localStorage.getItem(this.storageKey);

        return reuslt !== null ? true : false;
    }

}

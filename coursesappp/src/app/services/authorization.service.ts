import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class AuthorizationService {
    private storageKey = 'currentUser';
    constructor() {
    }

    login(login: string, password: string) {
        const user = new User(login, password);
        localStorage.setItem(this.storageKey, JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem(this.storageKey);
    }

    isAuthenticated(): boolean {
        const reuslt = localStorage.getItem(this.storageKey);

        return reuslt !== null ? true : false;
    }

    getUserInfo(): User {
        const returnObj = JSON.parse(localStorage.getItem(this.storageKey));
        return returnObj;
    }
}

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizationService {
    private storageKey = 'currentUser';
    public userInfo: Subject<User> = new Subject<User>();
    constructor() {
    }

    login(login: string, password: string) {
        const user = new User(login, password);
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.userInfo.next(user);
    }

    logout() {
        localStorage.removeItem(this.storageKey);
        this.userInfo.next();
    }

    isAuthenticated(): boolean {
        const reuslt = localStorage.getItem(this.storageKey);

        return reuslt !== null ? true : false;
    }

    private getUserInfo(): User {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }
}

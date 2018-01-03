import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class AuthorizationService {
    private storageKey = 'currentUser';
    public userInfo: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserInfo());
    constructor() {
    }

    login(login: string, password: string) {
        const user = new User(login, password);
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.userInfo.next(user);
    }

    logout() {
        localStorage.removeItem(this.storageKey);
        this.userInfo.next(null);
    }

    isAuthenticated(): boolean {
        const reuslt = localStorage.getItem(this.storageKey);

        return reuslt !== null ? true : false;
    }

    private getUserInfo(): User {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }
}

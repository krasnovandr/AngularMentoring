import { Injectable } from '@angular/core';
import { UserLogin, UserInfo, SignInResponse } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationTokenService } from './authToken.service';

@Injectable()
export class AuthorizationService {
    constructor(private http: HttpClient, private tokenService: AuthorizationTokenService) {
    }

    login(login: string, password: string): Observable<SignInResponse> {
        const user = new UserLogin(login, password);
        const loginUrl = 'auth/login';
        return this.http.post<SignInResponse>(`${environment.apiEndpoints.apiUrl}/${loginUrl}`, user);
    }

    logout() {
        this.tokenService.removeAuthorizationToken();
    }

    public getUserInfo(): Observable<UserInfo> {
        const userInfoUrl = 'auth/userInfo';
        return this.http.get<UserInfo>(`${environment.apiEndpoints.apiUrl}/${userInfoUrl}`);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { SignInResponse, UserInfo, UserLogin } from '../models/user';
import { AuthorizationTokenService } from './authToken.service';

@Injectable()
export class AuthorizationService {
    public apiUrl = environment.apiEndpoints.apiUrl;
    public loginUrl = 'auth/login';
    public userInfoUrl = 'auth/userInfo';
    constructor(private http: HttpClient, private tokenService: AuthorizationTokenService) {
    }

    login(login: string, password: string): Observable<SignInResponse> {
        const user = new UserLogin(login, password);

        return this.http.post<SignInResponse>(`${this.apiUrl}/${this.loginUrl}`, user);
    }

    logout() {
        this.tokenService.removeAuthorizationToken();
    }

    public getUserInfo(): Observable<UserInfo> {
        return this.http.get<UserInfo>(`${this.apiUrl}/${this.userInfoUrl}`);
    }
}

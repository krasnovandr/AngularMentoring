import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CourseListModel, CourseResponseDto, PagerOptions } from '../models/courses';
import { stubbedDtoCourses } from '../pipes/stubbed.data';
import { AuthorizationService } from './authorization.service';
import { CoursesService } from './courses.service';
import { AuthorizationTokenService } from './authToken.service';
import { UserInfo, SignInResponse } from '../models/user';

describe('AuthorizationService', () => {
    let authService: AuthorizationService;
    let httpTestController: HttpTestingController;
    let tokenService: AuthorizationTokenService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthorizationService, AuthorizationTokenService]
        });

        authService = TestBed.get(AuthorizationService);
        tokenService = TestBed.get(AuthorizationTokenService);
        httpTestController = TestBed.get(HttpTestingController);
    });
    afterEach(() => {
        httpTestController.verify();
    });

    it('should call token service remove method when logout action clicked', () => {
        spyOn(tokenService, 'removeAuthorizationToken');
        authService.logout();

        expect(tokenService.removeAuthorizationToken).toHaveBeenCalled()
    });
    it('should call getuserinfo backend and recieve userinfo ', () => {
        let userInfo: UserInfo = { id: 1, name: { first: 'first', last: 'last' }, fakeToken: 'fakeToken', login: 'login', password: 'password' };
        authService.getUserInfo().subscribe((info) => {
            expect(info).toEqual(userInfo);
        });

        const req = httpTestController.expectOne(`${authService.apiUrl}/${authService.userInfoUrl}`);
        expect(req.request.method).toBe('GET');
        req.flush(userInfo);
    });
    it('should call token service remove method when logout action clicked', () => {
        let login = 'login';
        let password = 'password';
        let fakeResponse: SignInResponse = { token: 'token' };

        authService.login(login, password).subscribe((response: SignInResponse) => {
            expect(response).toEqual(fakeResponse);
        });

        const req = httpTestController.expectOne(`${authService.apiUrl}/${authService.loginUrl}`);
        expect(req.request.method).toBe('POST');
        req.flush(fakeResponse);
    });
});

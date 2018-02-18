import { CommonModule } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppModule } from '../app.module';
import { AuthorizationTokenService } from '../services/authToken.service';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let tokenService: AuthorizationTokenService;
    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, AppModule],
            providers: [
                AuthorizationTokenService,
                AuthGuard,
                { provide: Router, useValue: mockRouter },
            ]
        }).compileComponents(); // compile template and css
    }));

    beforeEach(() => {
        authGuard = TestBed.get(AuthGuard);
        tokenService = TestBed.get(AuthorizationTokenService);
    });

    it('should be able to hit route when user is logged in', () => {
        spyOn(tokenService, 'isAuthenticated').and.returnValue(true);
        expect(authGuard.canActivate()).toBe(true);
    });
    it('should redirect to the login page when the user is not logged in', () => {
        spyOn(tokenService, 'isAuthenticated').and.returnValue(false);
        authGuard.canActivate();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
    });
});

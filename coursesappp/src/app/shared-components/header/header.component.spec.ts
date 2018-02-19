import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { StoreModule, Store } from '@ngrx/store';
import { coursesReducer } from '../../store/courses.reducer';
import { MainState } from '../../store/courses.model';
import { AuthorizationTokenService } from '../../services/authToken.service';
import { Logout } from '../../store/courses.actions';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let store: Store<MainState>;
    let tokenService: AuthorizationTokenService
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({
                mainStore: coursesReducer
            })],
            providers: [AuthorizationTokenService],
            declarations: [HeaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        tokenService = TestBed.get(AuthorizationTokenService)
        spyOn(store, 'dispatch').and.callThrough();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call token service when isAuthenticated was called', () => {
        spyOn(tokenService, 'isAuthenticated').and.returnValue(true);
        component.isAuthenticated();

        expect(component.isAuthenticated()).toEqual(true);
    });
    it('should dispatch logut action when logout link was clicked', () => {
        let action = new Logout();
        component.signOut();

        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});

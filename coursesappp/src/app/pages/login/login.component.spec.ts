import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { Login } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';
import { coursesReducer } from '../../store/courses.reducer';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let store: Store<MainState>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [ReactiveFormsModule, FormsModule, StoreModule.forRoot({
                mainStore: coursesReducer
            })],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
    });

    it('should create component succesgully ', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch logon action when login button was clicked', () => {
        const login = 'userName';
        const password = 'userName';
        const action = new Login(login, password);

        component.onLogin({ login, password });

        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});

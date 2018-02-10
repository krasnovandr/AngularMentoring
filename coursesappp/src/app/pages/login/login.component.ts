import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthorizationService } from '../../services/authorization.service';
import { AuthorizationTokenService } from '../../services/authToken.service';
import { SpinnerService } from '../../services/spinner.service';
import { Login } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginResult: string;

  constructor(private authService: AuthorizationService,
    private tokenService: AuthorizationTokenService,
    private router: Router,
    private spinner: SpinnerService,
    private cd: ChangeDetectorRef,
    private store: Store<MainState>) { }
  ngOnInit() {
  }

  onLogin(loginForm: any) {
    this.store.dispatch(new Login(loginForm.login, loginForm.password));
  }
}

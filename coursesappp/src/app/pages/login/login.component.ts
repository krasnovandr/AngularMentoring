import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Login } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private store: Store<MainState>) { }
  ngOnInit() {
  }

  onLogin(loginForm: any) {
    this.store.dispatch(new Login(loginForm.login, loginForm.password));
  }
}

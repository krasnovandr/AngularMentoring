import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../services/authorization.service';
import { AuthorizationTokenService } from '../../services/authToken.service';
import { SpinnerService } from '../../services/spinner.service';

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
    private cd: ChangeDetectorRef) { }
  ngOnInit() {
  }


  onLogin(loginForm: any) {
    const spinnerRef = this.spinner.start();
    this.loginResult = '';
    this.authService.login(loginForm.login, loginForm.password)
      .map(response => response.token).subscribe(token => {
        this.tokenService.setAuthorizationToken(token);
        spinnerRef.close();
        this.router.navigate(['courses']);
      }, (error: HttpErrorResponse) => {
        this.loginResult = error.error;
        spinnerRef.close();
        this.cd.markForCheck();
      });
  }
}

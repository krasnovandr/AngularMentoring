import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { AuthorizationTokenService } from '../../services/authToken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private loginResult: string;

  constructor(private authService: AuthorizationService,
    private tokenService: AuthorizationTokenService,
    private router: Router,
    private spinner: SpinnerService,
    private cd: ChangeDetectorRef) { }
  ngOnInit() {
  }

  onLogin(login: string, password: string) {
    const spinnerRef = this.spinner.start();
    this.loginResult = '';

    this.authService.login(login, password)
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

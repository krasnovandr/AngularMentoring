import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthorizationService,
    private router: Router,
    private spinner: SpinnerService) { }

  ngOnInit() {
  }

  onLogin(login: string, password: string) {
    const spinnerRef = this.spinner.start();

    setTimeout(() => {
      this.authService.login(login, password);
      spinnerRef.close();
    }, 2000);

    this.router.navigate(['courses']);
  }

}

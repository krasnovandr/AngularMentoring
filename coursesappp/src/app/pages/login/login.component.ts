import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(login: string, password: string) {
    this.authService.login(login, password);
    this.router.navigate(['courses']);
  }

}

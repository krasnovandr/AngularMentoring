import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: string;
  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.currentUser = this.authService.getUserInfo().login;
    }
  }

}

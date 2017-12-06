import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

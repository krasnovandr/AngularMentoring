import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private userName: string;
  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.authService.userInfo.subscribe(user => {
      this.userName = user ? user.login : '';
      this.cd.markForCheck();
    });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userName: string;
  private subscription: Subscription;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private cd: ChangeDetectorRef) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.authService.userInfo.subscribe(user => {
      this.userName = user ? user.login : '';
      this.cd.markForCheck();
    });
  }


  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}

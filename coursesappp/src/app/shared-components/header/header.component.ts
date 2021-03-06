import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthorizationService } from '../../services/authorization.service';
import { AuthorizationTokenService } from '../../services/authToken.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userName: string;
  private subscription: Subscription;

  constructor(
    private authService: AuthorizationService,
    private tokenService: AuthorizationTokenService,
    private router: Router,
    private cd: ChangeDetectorRef) { }


  ngOnInit() {
    this.subscription = this.tokenService.userToken.subscribe((token: string) => {
      if (token) {
        this.getUser();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public isAuthenticated() {
    return this.tokenService.isAuthenticated();
  }

  private getUser() {
    this.authService.getUserInfo().subscribe(userInfo => {
      this.userName = userInfo ? `${userInfo.name.first} ${userInfo.name.last}` : '';
      this.cd.markForCheck();
    });
  }
}

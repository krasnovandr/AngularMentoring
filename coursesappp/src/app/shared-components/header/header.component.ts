import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AuthorizationTokenService } from '../../services/authToken.service';
import { GetUserInfo, Logout } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userName: string;
  private subscription: Subscription;

  constructor(
    private store: Store<MainState>,
    private tokenService: AuthorizationTokenService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.store
      .select(value => value.mainStore.userToken)
      .subscribe(value => {
        if (value) {
          this.store.dispatch(new GetUserInfo(value));
        }
      });

    this.subscription = this.store
      .select(value => value.mainStore.userInfo)
      .subscribe(value => {
        if (value) {
          this.userName = `${value.name.first} ${value.name.last}`;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private signOut() {
    this.store.dispatch(new Logout());
  }

  public isAuthenticated() {
    return this.tokenService.isAuthenticated();
  }
}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { AuthorizationTokenService } from '../../services/authToken.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  private loginResult: string;

  constructor(private authService: AuthorizationService,
    private tokenService: AuthorizationTokenService,
    private router: Router,
    private spinner: SpinnerService,
    private cd: ChangeDetectorRef) { }
  ngOnInit() {
  }



}

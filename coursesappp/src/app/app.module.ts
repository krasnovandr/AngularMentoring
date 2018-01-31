import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './common/authInterceptor';
import { ColoredborderDirective } from './directives/coloredborder.directive';
import { InfiniteScrollerDirective } from './directives/infinitescroll.directive';
import { AuthGuard } from './guards/auth-guard';
import { UnsavedFormGuard } from './guards/unsaved-form.guard';
import { AuthorsControlComponent } from './pages/course/authors.control/authors-control.component';
import { CourseComponent } from './pages/course/course.component';
import { CourseDetailComponent } from './pages/courses/components/course-detail/course-detail.component';
import { CoursesListComponent } from './pages/courses/components/courses-list/courses-list.component';
import { PagerComponent } from './pages/courses/components/pager/pager.component';
import { ToolboxComponent } from './pages/courses/components/toolbox/toolbox.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderbyPipe } from './pipes/orderby.pipe';
import { AuthorizationService } from './services/authorization.service';
import { AuthorsService } from './services/authors.service';
import { AuthorizationTokenService } from './services/authToken.service';
import { CoursesService } from './services/courses.service';
import { SpinnerService } from './services/spinner.service';
import { BaseModalBodyLoaderService } from './shared-components/base-modal/base-modal-body-loader.service';
import { BaseModalRemoteService } from './shared-components/base-modal/base-modal-remote.service';
import { BaseModalComponent } from './shared-components/base-modal/base-modal.component';
import { BaseModalService } from './shared-components/base-modal/base-modal.service';
import { BreadcrumpComponent } from './shared-components/breadcrump/breadcrump.component';
import { ConfirmationModalComponent } from './shared-components/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalService } from './shared-components/confirmation-modal/confirmation-modal.service';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { SpinnerComponent } from './shared-components/spinner/spinner.component';
import { CoursesEffects } from './store/courses.effects';
import { coursesReducer } from './store/courses.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    HeaderComponent,
    FooterComponent,
    ToolboxComponent,
    ConfirmationModalComponent,
    ColoredborderDirective,
    DurationPipe,
    OrderbyPipe,
    FilterPipe,
    SpinnerComponent,
    CourseComponent,
    CoursesListComponent,
    PagerComponent,
    AuthorsControlComponent,
    PageNotFoundComponent,
    BreadcrumpComponent,
    BaseModalComponent,
    InfiniteScrollerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      mainStore: coursesReducer
    }),
    EffectsModule.forRoot([
      CoursesEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    CoursesService,
    BaseModalService,
    BaseModalBodyLoaderService,
    BaseModalRemoteService,
    AuthorizationService,
    FilterPipe,
    SpinnerService,
    AuthorizationTokenService,
    AuthorsService,
    DatePipe,
    AuthGuard,
    UnsavedFormGuard,
    ConfirmationModalService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationModalComponent, SpinnerComponent, BaseModalComponent]
})
export class AppModule { }

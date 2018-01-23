import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './common/authInterceptor';
import { ColoredborderDirective } from './directives/coloredborder.directive';
import { AuthorsControlComponent } from './pages/course/authors.control/authors-control.component';
import { CourseComponent } from './pages/course/course.component';
import {
  CourseDeleteOverlayComponent,
} from './pages/courses/components/course-delete-overlay/course-delete-overlay.component';
import { CourseDetailComponent } from './pages/courses/components/course-detail/course-detail.component';
import { CoursesListComponent } from './pages/courses/components/courses-list/courses-list.component';
import { PagerComponent } from './pages/courses/components/pager/pager.component';
import { ToolboxComponent } from './pages/courses/components/toolbox/toolbox.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderbyPipe } from './pipes/orderby.pipe';
import { AuthorizationService } from './services/authorization.service';
import { AuthorsService } from './services/authors.service';
import { AuthorizationTokenService } from './services/authToken.service';
import { CourseDeleteOverlayService } from './services/course-delete-overlay.service';
import { CoursesService } from './services/courses.service';
import { SpinnerService } from './services/spinner.service';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { SpinnerComponent } from './shared-components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    HeaderComponent,
    FooterComponent,
    ToolboxComponent,
    CourseDeleteOverlayComponent,
    LoginComponent,
    ColoredborderDirective,
    DurationPipe,
    OrderbyPipe,
    FilterPipe,
    SpinnerComponent,
    CourseComponent,
    CoursesListComponent,
    PagerComponent,
    AuthorsControlComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    CoursesService,
    CourseDeleteOverlayService,
    AuthorizationService,
    FilterPipe,
    SpinnerService,
    AuthorizationTokenService,
    AuthorsService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [CourseDeleteOverlayComponent, SpinnerComponent]
})
export class AppModule { }

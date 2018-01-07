import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesService } from './services/courses.service';
import { CourseDeleteOverlayService } from './services/course-delete-overlay.service';
import { AuthorizationService } from './services/authorization.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ColoredborderDirective } from './directives/coloredborder.directive';
import { CourseDetailComponent } from './pages/courses/components/course-detail/course-detail.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { ToolboxComponent } from './pages/courses/components/toolbox/toolbox.component';
import { CourseDeleteOverlayComponent } from './pages/courses/components/course-delete-overlay/course-delete-overlay.component';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderbyPipe } from './pipes/orderby.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { SpinnerComponent } from './shared-components/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { CourseComponent } from './pages/course/course.component';

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
    CourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    AppRoutingModule
  ],
  providers: [
    CoursesService,
    CourseDeleteOverlayService,
    AuthorizationService,
    FilterPipe,
    SpinnerService],
  bootstrap: [AppComponent],
  entryComponents: [CourseDeleteOverlayComponent, SpinnerComponent]
})
export class AppModule { }
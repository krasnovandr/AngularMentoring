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
    ColoredborderDirective
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
    AuthorizationService],
  bootstrap: [AppComponent],
  entryComponents: [CourseDeleteOverlayComponent]
})
export class AppModule { }

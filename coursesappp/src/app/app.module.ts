import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesService } from './services/courses.service';
import { CourseDeleteOverlayService } from './services/course-delete-overlay.service';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseDeleteOverlayComponent } from './components/course-delete-overlay/course-delete-overlay.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { AuthorizationService } from './services/authorization.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    HeaderComponent,
    FooterComponent,
    ToolboxComponent,
    CourseDeleteOverlayComponent,
    LoginComponent
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

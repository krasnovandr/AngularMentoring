import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { ToolboxComponent } from './toolbox/toolbox.component';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesService } from './courses.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CourseDeleteOverlayComponent } from './course-delete-overlay/course-delete-overlay.component';
import { CourseDeleteOverlayService } from './course-delete-overlay/course-delete-overlay.service';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    HeaderComponent,
    FooterComponent,
    ToolboxComponent,
    CourseDeleteOverlayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    PortalModule
  ],
  providers: [
    CoursesService,
    CourseDeleteOverlayService],
  bootstrap: [AppComponent],
  entryComponents: [CourseDeleteOverlayComponent]
})
export class AppModule { }

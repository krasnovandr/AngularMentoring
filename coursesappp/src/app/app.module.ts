import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { ToolboxComponent } from './toolbox/toolbox.component';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent, RotiniPanel, SpagettiPanel, KeyboardTrackingPanel } from './course-detail/course-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesService } from './courses.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    HeaderComponent,
    FooterComponent,
    ToolboxComponent,
    RotiniPanel,
    SpagettiPanel, KeyboardTrackingPanel
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    PortalModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent],
  entryComponents: [RotiniPanel, SpagettiPanel,KeyboardTrackingPanel]
})
export class AppModule { }

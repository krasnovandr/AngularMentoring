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


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent,
    HeaderComponent,
    FooterComponent,
    ToolboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

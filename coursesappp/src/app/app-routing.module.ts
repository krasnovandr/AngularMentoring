import { CoursesComponent } from './pages/courses/courses.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { CourseComponent } from './pages/course/course.component';

const routes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses', component: CoursesComponent },
    { path: 'courses/create', component: CourseComponent },
    { path: 'courses/edit/:id', component: CourseComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }



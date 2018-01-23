import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseComponent } from './pages/course/course.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
    { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
    { path: 'courses/new', component: CourseComponent, canActivate: [AuthGuard] },
    { path: 'courses/:id', component: CourseComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    { path: 'notfound', component: PageNotFoundComponent },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }



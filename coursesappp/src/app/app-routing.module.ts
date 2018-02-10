import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseComponent } from './pages/course/course.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { AuthGuard } from './guards/auth-guard';
import { UnsavedFormGuard } from './guards/unsaved-form.guard';

const routes: Routes = [
    {
        path: 'courses', component: CoursesComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: '' }
    },
    // {
    //     path: 'courses/new',
    //     component: CourseComponent,
    //     data: { breadcrumb: 'New Course' },
    //     canActivate: [AuthGuard],
    //     canDeactivate: [UnsavedFormGuard]
    // },
    // {
    //     path: 'courses/:id',
    //     component: CourseComponent,
    //     canActivate: [AuthGuard],
    //     canDeactivate: [UnsavedFormGuard],
    //     data: { breadcrumb: 'Course' }
    // },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },

    { path: 'notfound', component: PageNotFoundComponent },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }



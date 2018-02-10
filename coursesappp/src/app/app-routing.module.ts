import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth-guard';
import { CoursesComponent } from './pages/courses/courses.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';

const routes: Routes = [
    {
        path: 'courses', component: CoursesComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: '' }
    },
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



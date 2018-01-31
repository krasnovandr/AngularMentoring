import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { routing } from './login.routing';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        routing
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule { }

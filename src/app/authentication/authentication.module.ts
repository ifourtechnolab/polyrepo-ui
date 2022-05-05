import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../shared/material-module/material-module.module';

@NgModule({
  declarations: [LoginComponent,RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule
  ]
})
export class AuthenticationModule { }

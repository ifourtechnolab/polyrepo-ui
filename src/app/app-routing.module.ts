import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo/demo.component';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import {LoginComponent} from './authentication/login/login.component';
import {RegistrationComponent} from './authentication/registration/registration.component';
const routes: Routes = [
  { path: '', component: DemoComponent },
  { path: 'repository-page',component:RepositoryPageComponent},
  {path: 'login',component:LoginComponent},
  {path: 'registration',component:RegistrationComponent},
  { path: '**', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

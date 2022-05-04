import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo/demo.component';
import { RepositoryPageComponent } from './repository-page/repository-page.component';

const routes: Routes = [
  { path:'', component: DemoComponent },
  { path:'home', component: DemoComponent },
  { path:'repo',loadChildren:()=>import('./repository-page/repository-page.module').then(m=>m.RepositoryPageModule)},
  { path:'auth',loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  { path:'**', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

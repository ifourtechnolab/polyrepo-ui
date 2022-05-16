import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path:'', component: DemoComponent },
  { path:'home', component: DemoComponent },
  { path:'repo',loadChildren:()=>import('./repository-page/repository-page.module').then(m=>m.RepositoryPageModule),canActivate:[AuthGuard]},
  { path:'auth',loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  { path:'**', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

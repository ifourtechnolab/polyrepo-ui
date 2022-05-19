import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { AuthLoggedGuard } from './shared/auth-logged.guard';
import { AuthRepoGuard } from './shared/auth-repo.guard';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path:'', component: DemoComponent },
  { path:'home', component: DemoComponent },
  { path:'repo',loadChildren:()=>import('./repository-page/repository-page.module').then(m=>m.RepositoryPageModule),canActivate:[AuthRepoGuard]},
  { path:'auth',loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule),canActivate:[AuthLoggedGuard]},
  { path:'dashboard',loadChildren:()=>import('./dashboard/dashboard-routing.module').then(m=>m.DashboardRoutingModule),canActivate:[AuthGuard]},
  { path:'**', component: DemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddrepositoryComponent } from './addrepository/addrepository.component';
import { IssueanalysisComponent } from './issueanalysis/issueanalysis.component';
import { PranalysisComponent } from './pranalysis/pranalysis.component';
import { RepositoryPageComponent } from './repository-page.component';
import { ShowRepositoryComponent } from './show-repository/show-repository.component';
const routes: Routes = [
  {path:'',component:RepositoryPageComponent,
  children:[
    {path:'issue',component:IssueanalysisComponent},
    {path:'pr',component:PranalysisComponent},
    {path:'showRepo',component:ShowRepositoryComponent},
  ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryPageRoutingModule { }

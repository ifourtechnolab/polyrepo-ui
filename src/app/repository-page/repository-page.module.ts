import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from '../shared/material-module/material-module.module';
import { IssueanalysisComponent } from './issueanalysis/issueanalysis.component';
import { RepositoryPageRoutingModule } from './repository-page-routing.module';
import { RepositoryPageComponent } from './repository-page.component';
import { PranalysisComponent } from './pranalysis/pranalysis.component';
import { ShowRepositoryComponent } from './show-repository/show-repository.component';
import { AddrepositoryComponent } from './addrepository/addrepository.component';
import { SavequeryComponent } from './savequery/savequery.component';

@NgModule({
  declarations: [
    RepositoryPageComponent,
    AddrepositoryComponent,
    IssueanalysisComponent,
    PranalysisComponent,
    ShowRepositoryComponent,
    SavequeryComponent
  ],
  imports: [
    CommonModule,
    RepositoryPageRoutingModule,
    RouterModule,
    HttpClientModule,
    MaterialModuleModule
  ],
})
export class RepositoryPageModule { }

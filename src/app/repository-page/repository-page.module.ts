import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule} from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

import { IssueanalysisComponent } from './issueanalysis/issueanalysis.component';
import { RepositoryPageRoutingModule } from './repository-page-routing.module';
import { RepositoryPageComponent } from './repository-page.component';
import { PranalysisComponent } from './pranalysis/pranalysis.component';
import { ShowRepositoryComponent } from './show-repository/show-repository.component';
import { AddrepositoryComponent } from './addrepository/addrepository.component';


@NgModule({
  declarations: [
    RepositoryPageComponent,
    AddrepositoryComponent,
    IssueanalysisComponent,
    PranalysisComponent,
    ShowRepositoryComponent
  ],
  imports: [
    CommonModule,
    RepositoryPageRoutingModule,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    AngularMultiSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule
  ],
})
export class RepositoryPageModule { }

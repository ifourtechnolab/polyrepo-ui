import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { IssueanalysisComponent } from './repository-page/issueanalysis/issueanalysis.component';
import { PranalysisComponent } from './repository-page/pranalysis/pranalysis.component';
import { ShowRepositoryComponent } from './repository-page/show-repository/show-repository.component';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { AddrepositoryComponent } from './repository-page/addrepository/addrepository.component';



@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    RepositoryPageComponent,
    ShowRepositoryComponent,
    AddrepositoryComponent, 
    IssueanalysisComponent,  
    PranalysisComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatDialogModule,AngularMultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

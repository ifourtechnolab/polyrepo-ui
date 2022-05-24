import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PinnedqueryComponent } from './pinnedqueryresult/pinnedqueryresult.component';
import { TrendcaptureComponent } from './trendcapture/trendcapture.component';
import { MaterialModuleModule } from '../shared/material-module/material-module.module';
import { ShowqueryComponent } from './showquery/showquery.component';
import { ShowqueryresultComponent } from './showqueryresult/showqueryresult.component';
import { ShowquerydetailsComponent } from './showquerydetails/showquerydetails.component';


@NgModule({
  declarations: [
    PinnedqueryComponent,
    ShowqueryComponent,
    TrendcaptureComponent,
    DashboardComponent,
    ShowqueryresultComponent,
    ShowquerydetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    MaterialModuleModule
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }

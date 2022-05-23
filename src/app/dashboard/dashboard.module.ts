import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PinnedqueryComponent } from './pinnedqueryresult/pinnedqueryresult.component';
import { SavedqueryComponent } from './savedqueryresult/savedqueryresult.component';
import { TrendcaptureComponent } from './trendcapture/trendcapture.component';
import { MaterialModuleModule } from '../shared/material-module/material-module.module';

@NgModule({
  declarations: [
    PinnedqueryComponent,
    SavedqueryComponent,
    TrendcaptureComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModuleModule,
    RouterModule,
  ]
})
export class DashboardModule { }

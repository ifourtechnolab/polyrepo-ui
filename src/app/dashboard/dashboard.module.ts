import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PinnedqueryComponent } from './pinnedqueryresult/pinnedqueryresult.component';
import { SavedqueryComponent } from './savedqueryresult/savedqueryresult.component';
import { TrendcaptureComponent } from './trendcapture/trendcapture.component';


@NgModule({
  declarations: [
    PinnedqueryComponent,
    SavedqueryComponent,
    TrendcaptureComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

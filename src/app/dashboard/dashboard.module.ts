import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PinnedqueryComponent } from './pinnedquery/pinnedquery.component';
import { SavedqueryComponent } from './savedquery/savedquery.component';
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { PinnedqueryComponent } from './pinnedquery/pinnedquery.component';
import { SavedqueryComponent } from './savedquery/savedquery.component';
import { TrendcaptureComponent } from './trendcapture/trendcapture.component';

const routes: Routes = [
  { path:'', component:DashboardComponent,
  children:[
    {path:'',component:PinnedqueryComponent},
    {path:'pinned',component:PinnedqueryComponent},
    {path:'saved',component:SavedqueryComponent},
    {path:'trendcapture',component:TrendcaptureComponent},
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

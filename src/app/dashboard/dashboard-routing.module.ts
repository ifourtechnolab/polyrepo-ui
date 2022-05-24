import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PinnedqueryComponent } from './pinnedqueryresult/pinnedqueryresult.component';
import { ShowqueryComponent } from './showquery/showquery.component';
import { TrendcaptureComponent } from './trendcapture/trendcapture.component';

const routes: Routes = [
  { path:'', component:DashboardComponent,
  children:[
    {path:'pinned',component:PinnedqueryComponent},
    {path:'showquery',component:ShowqueryComponent},
    {path:'trendcapture',component:TrendcaptureComponent},
  ],
},
{path:'**',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

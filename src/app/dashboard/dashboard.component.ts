import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { HttpService } from '../shared/http.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: any;

  orgListForm = new FormGroup({
    organizationName: new FormControl('', [Validators.required]),
  });
  
  orgName: any;
  organizationsData: any;
  login: any;
  isdisable: boolean = true;
  filtersOptions: string[] = ['Pinned Query', 'Saved Query', 'Trend Capture'];

  constructor(private http: HttpService, public router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
  }

  get organizationName() {
    return this.orgListForm.get('organizationName');
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['demo']);
  }

  public getOrganization() {
    this.orgName = this.orgListForm.value.organizationName;
    if (this.orgName != '') {
      this.http
        .getData(this.orgName)
        .subscribe((orgNameData: any) => {
          this.organizationsData = _.merge([], orgNameData.edges);
        });
    }
  }

  setOrgToLocal(event: any) {
    this.login = this.organizationsData[event].node.login;
    localStorage.setItem('orgLogin', this.login);
  }

  public searchvisibility() {
    if (this.orgName == '') {
      this.isdisable = true;
    } else {
      this.isdisable = false;
    }
  }

  routeToRepository() {
    this.router.navigate(['/repo']);
  }

  changeSpan(value: any){
    let sel = value.option.selectionList._value[0];
    if(sel=='Pinned Query')
    {
      this.router.navigate(['dashboard/pinned']);
    }
    else if(sel=='Saved Query')
    {
      this.router.navigate(['dashboard/saved']);
    }
    else if(sel=='Trend Capture')
    {
      this.router.navigate(['dashboard/trendcapture']);
    }
  }

}
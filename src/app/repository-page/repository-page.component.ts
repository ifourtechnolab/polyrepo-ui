import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { UtilService } from '../shared/util.service';
@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit {

  authToken: any;
  orgProfileData: any;
  orgLogin: any;
  repoNameList: any;
  item:any;
  receiveData:any;
  orgName:any;
  filters: string[] = ['Issue Analysis', 'PR Analysis'];

  constructor(private http: HttpService, public router: Router, private util:UtilService) { 
    if((this.router.getCurrentNavigation().extras.state) != null){
      this.receiveData = this.router.getCurrentNavigation().extras.state;
      console.log(this.receiveData.data);
      if ((this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'orgName'); })).length > 0) {
        this.orgName = this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'orgName'); })[0].paramValue;
      }
    }
   }

  ngOnInit(): void {
    if(this.orgName!=null){
      this.getOrgProfile(this.orgName);
    }
    else if(this.util.hasOrgValue()){
      // this.router.navigate(['/dashboard']);
      this.orgLogin = localStorage.getItem('orgLogin');
      this.getOrgProfile(this.orgLogin);
    }
    else{
    
    }
  }
  changeSpan(value: any){
    let sel = value.option.selectionList._value[0];
    if(sel=='Issue Analysis')
    {
      this.router.navigate(['repo/issue']);
    }
    else if(sel=='PR Analysis')
    {
      this.router.navigate(['repo/pr']);
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['demo']);
  }

  dashboard(){
    localStorage.removeItem('orgLogin');
    this.router.navigate(['dashboard']);
  }

  getOrgProfile(name: any){
    this.http
      .getOrgProfile(name)
      .subscribe((orgProfile: any) => {
        this.orgProfileData = orgProfile;
      });
  }
}

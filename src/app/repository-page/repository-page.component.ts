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
  // filters: string[] = ['Issue Analysis', 'PR Analysis'];
  filters: {
    name : string;
    selected : boolean;
  }[] = [
    {
      name : 'Issue Analysis',
      selected : true
    },
    {
      name : 'PR Analysis',
      selected : false
    }
  ];

  constructor(private http: HttpService, public router: Router, private util:UtilService) { 
    if((this.router.getCurrentNavigation().extras.state) != null){
      this.receiveData = this.router.getCurrentNavigation().extras.state;
      console.log(this.receiveData.data);
      this.util.setQueryTitle(this.receiveData.data.title)
      this.util.setQueryKey(this.receiveData.data.quryKey)
      if ((this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'orgName'); })).length > 0) {
        this.orgName = this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'orgName'); })[0].paramValue;
      }

      if ((this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'days'); })).length > 0) {
        this.util.setQueryDays(this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'days'); })[0].paramValue);
      }
      if ((this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'label'); })).length > 0) {
        this.util.setQueryLabel(this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'label'); })[0].paramValue);
      }
      if (this.receiveData.data.repoList[0].repoName != null) {
        this.util.setCollectiveRepoData(this.receiveData.data.repoList.map((x: any) => {return {id: x.repoName,name: x.repoName};}));
        // this.repoListData = { "repoNames": this.repoListData };
      }
      if ((this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'type'); })).length > 0) {
        this.util.setQueryType(this.receiveData.data.paramList.filter(function (obj) { return (obj.paramName == 'type'); })[0].paramValue);
      }

    }

   }

  ngOnInit(): void {
    if(this.orgName!=null){
      this.getOrgProfile(this.orgName);
       let type = this.util.getQueryType();
       debugger
       if(type == 'pr'){
         
        this.filters[1].selected = true;
        this.filters[0].selected = false;
        this.router.navigate(['repo/pr']);
       }
       if(type == 'issue'){
        this.filters[0].selected = true;
        this.filters[1].selected = true;
        this.router.navigate(['repo/issue']);
       }
    }
    else if(this.util.hasOrgValue()){
      // this.router.navigate(['/dashboard']);
      this.orgLogin = localStorage.getItem('orgLogin');
      this.getOrgProfile(this.orgLogin);
      this.util.setCollectiveRepoData([]);
      if(this.filters[0].selected == true){
        this.router.navigate(['repo/issue']);
      }
      if(this.filters[1].selected == true){
        this.router.navigate(['repo/pr']);
      }
    }
  }
  changeSpan(value: any){
    let sel = value.option.selectionList._value[0].name;
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

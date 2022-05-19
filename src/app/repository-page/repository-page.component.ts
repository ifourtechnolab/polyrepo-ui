import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
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
  filters: string[] = ['Issue Analysis', 'PR Analysis'];

  constructor(private http: HttpService, public router: Router) { }

  ngOnInit(): void {
    this.orgLogin = localStorage.getItem('orgLogin');
    this.http
      .getOrgProfile(this.orgLogin)
      .subscribe((orgProfile: any) => {
        this.orgProfileData = orgProfile;
      });
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
    this.router.navigate(['dashboard']);
  }
}

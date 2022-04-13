import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import * as _ from 'lodash';

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

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token');
    this.orgLogin = localStorage.getItem('orgLogin');
    this.http
      .getOrgProfile(this.authToken, this.orgLogin)
      .subscribe((orgProfile: any) => {
        console.log(orgProfile.organization.avatarUrl);
        this.orgProfileData = orgProfile;
      });
  }
 
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Item } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-addrepository',
  templateUrl: './addrepository.component.html',
  styleUrls: ['./addrepository.component.scss'],
})
export class AddrepositoryComponent implements OnInit {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  tokenValue: any;
  products: any;
  repoNameList: any;
  orgLogin: any;
  authToken: any;
  selectedI: any = [];
  TemprepoNameList: any;
  //loading = false;
  isNextPage: boolean = false;
  nextPageHash!: string;
  loading: boolean = false;
  dialogRef: any;
  test:any;
  constructor(private http: HttpService, public matDialog: MatDialog) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token');
    this.orgLogin = localStorage.getItem('orgLogin');
    this.dropdownSettings = {
      singleSelection: false,
      primaryKey: 'id',
      labelKey: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      lazyLoading: true,
      badgeShowLimit:3,
      showCheckbox:true,
      classes: "myclass custom-class"
    };
    this.getRecords();
    this.callApi();
    this.test = setInterval(() => {
      if (this.isNextPage && this.nextPageHash) {
        this.callApi();
      }
    }, 5000);
    this.matDialog.afterAllClosed.subscribe((res) => {
      clearInterval(this.test);
    });
  }
  
  // get first 100 repos
  getRecords() {
    this.http
      .getRepoList(this.authToken, this.orgLogin)
      .subscribe((RepoList: any) => {
        console.log(RepoList);
        this.isNextPage = RepoList.pageInfo.hasNextPage;
        this.nextPageHash = RepoList.pageInfo.endCursor;
        this.repoNameList = RepoList.edges.map((x: any) => {
          return {
            id: x.repository.name,
            name: x.repository.name,
          };
        });
      });
  }

  // get rest of repos
callApi(){
  this.loading = true;
  this.http
    .getNextPageRepoList(this.authToken, this.nextPageHash, this.orgLogin)
    .subscribe((RepoList: any) => {
      console.log(RepoList);
      this.isNextPage = RepoList.pageInfo.hasNextPage;
      if (!this.isNextPage) {
        clearInterval(this.test);
      }
      this.nextPageHash = RepoList.pageInfo.endCursor;
      this.TemprepoNameList = RepoList.edges.map((x: any) => {
        return {
          id: x.repository.name,
          name: x.repository.name,
        };
      });
      this.repoNameList = this.repoNameList.concat(this.TemprepoNameList);
      this.loading = false;
      console.log(this.TemprepoNameList);
    });
}
  // selected values
  onItemSelect(item: any) {
    // this.selectedI += JSON.parse(item);
    this.selectedI.push(item);
  }

  onSelectAll(items: any) {
    this.selectedI=items;
    console.log(items);
  }

  addRepo(){
    console.log(this.selectedI)
    this.dialogRef.close({data:this.selectedI});
  }
}

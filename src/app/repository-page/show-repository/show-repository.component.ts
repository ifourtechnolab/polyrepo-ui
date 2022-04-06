import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { AddrepositoryComponent } from '../addrepository/addrepository.component';

@Component({
  selector: 'app-show-repository',
  templateUrl: './show-repository.component.html',
  styleUrls: ['./show-repository.component.css'],
})
export class ShowRepositoryComponent implements OnInit {

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  tokenValue: any;
  products: any;
  repoNameList: any;
  orgLogin: any;
  authToken: any;
  selectedI: any = [];
  jsonArr: any = [];
  repoListObject: any;
  repoName!:string ;

  constructor(private http: HttpService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token');
    this.orgLogin = localStorage.getItem('orgLogin');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };
    this.getRecords();
  }

  // get Data from API
  getRecords() {
    this.http
      .getRepoList(this.authToken, this.orgLogin)
      .subscribe((RepoList: any) => {
        console.log(RepoList);
        this.repoNameList = RepoList.edges.map((x: any) => {
          return {
            id: x.repository.name,
            name: x.repository.name
          }
        });
      });
  }
  // selected values
  onItemSelect(item: any) {
    this.jsonArr.push(item);
    this.repoListObject = { "repoNames": this.jsonArr };
    console.log(JSON.stringify(this.repoListObject));
    // console.log(this.orgLogin);
    // this.http.getIssueList(this.authToken,this.orgLogin,this.repoListObject) 
    // .subscribe((issueData: any) => {
    //   console.log(issueData);
    // });
  }
  onItemDeselect(item: any) {
    this.jsonArr.forEach((key: any, value: any) => {
      if (key.id === item.id) this.jsonArr.splice(value, 1);
    });
    this.repoListObject = { "repoNames": this.jsonArr };
    console.log(JSON.stringify(this.repoListObject));
  }

  contains(arr: any, key: any, val: any) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return true;
    }
    return false;
  }

  onSelectAll(items: any) {
    if (this.jsonArr.length == 0) {
      this.jsonArr = this.jsonArr.concat(items);
    }
    else {
      for (let i = 0; i < items.length; i++) {
        if (this.contains(this.jsonArr, "name", items[i].name)) {

          console.log(items[i].name);
        }
        else {
          this.jsonArr.push(items[i]);
        }
      }
    }

    this.repoListObject = { "repoNames": this.jsonArr };
    console.log(JSON.stringify(this.repoListObject));

    console.log(this.jsonArr);

  }
  onDeSelectAll(items: any) {
    console.log(this.jsonArr);
  }

  openDialog() {
    this.matDialog.open(AddrepositoryComponent);
    const openDialog = this.matDialog.open(AddrepositoryComponent);
    // .afterClosed().subscribe((res:any)=>{
    //   debugger
    //   this.repopenDialogoName=res.name;
    // });
  }
}


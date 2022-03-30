import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-show-repository',
  templateUrl: './show-repository.component.html',
  styleUrls: ['./show-repository.component.css']
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
  selectedI:any = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token');
    this.orgLogin = localStorage.getItem('orgLogin');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_name',
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
            item_id: x.repository.name,
            item_name: x.repository.name
          }
        });
      });
  }

  // selected values
  onItemSelect(item: any) {
    this.selectedI+=JSON.stringify(item);
    console.log(this.selectedI);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

}

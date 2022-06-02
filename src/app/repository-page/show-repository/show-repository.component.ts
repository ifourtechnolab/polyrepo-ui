import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { AddrepositoryComponent } from '../addrepository/addrepository.component';
import{UtilService} from '../../shared/util.service';

interface repoList {
  id: string;
  name: string;
}

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
  repoListObject: any;
  repoName!:string ;
  receiveData:any;
  nameOfItem: repoList[] = [];
  repoList: boolean = false;

  constructor(private http: HttpService, public matDialog: MatDialog,private util: UtilService) {  }

  ngOnInit(): void {
    this.authToken =this.util.getToken();
    this.orgLogin = localStorage.getItem('orgLogin');
    this.nameOfItem = this.util.getCollectiveRepoData();
    if(this.nameOfItem.length <= 0)
        this.repoList = false;
      else
        this.repoList = true;
  }

  openDialog() {
    const openDialog = this.matDialog.open(AddrepositoryComponent,{disableClose:true,hasBackdrop: true});
    openDialog.afterClosed().subscribe((result)=>{
      this.nameOfItem= _.uniqBy([...this.nameOfItem, ...result.data], JSON.stringify);
      this.util.setCollectiveRepoData(this.nameOfItem);
      if(this.nameOfItem.length <= 0)
        this.repoList = false;
      else
        this.repoList = true;
    })
  }
  remove(index : any){
    this.nameOfItem.splice(index, 1);
    if(this.nameOfItem.length <= 0){
      this.repoList = false;
    }
  }

}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface repoList {
  id: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  userInfo:any;
  selectedRepoList: repoList[] = [];
  constructor(private util: HttpClient) { }

  //set data from showrepository
  public setCollectiveRepoData(itemlist:any)
  {
    this.selectedRepoList=itemlist;
  }

  //return selected repo list data to pr or any page
  public getCollectiveRepoData()
  {
    return this.selectedRepoList;
  }

  public getUserInfo(){
    return JSON.parse(localStorage.getItem('user'));
  }

  public getToken(){
    this.userInfo= this.getUserInfo();
    return this.userInfo.token;
    
  }

  public getUserId(){
    this.userInfo=this.getUserInfo();
    return this.userInfo.id;
  }

  public getUserName(){
    this.userInfo=this.getUserInfo();
    return this.userInfo.username;
  }

  public isLoggedIn():boolean{
    this.userInfo = this.getUserInfo();
    return this.userInfo != null;
  }
}

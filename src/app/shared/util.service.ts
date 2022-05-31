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
  queryType: any;
  queryLabel: any;
  queryDays: any;
  queryKey: any;
  queryOrg:any;
  queryTitle :any;
  queryId:any;
  isPin:boolean;
  isTrend:boolean;
  queryUpdateStatus:boolean=false;
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

  public hasOrgValue():boolean{
    let orgLogin=localStorage.getItem('orgLogin');
    return orgLogin !=null;
  }

  public setQueryType(type : any){
    this.queryType = type;
  }

  public getQueryType(){
    return this.queryType;
  }

  public setQueryDays(days : any){
    this.queryDays = days;
  }
  
  public getQueryDays(){
    return this.queryDays;
  }

  public setQueryLabel(label : any){
    this.queryLabel = label;
  }
  
  public getQueryLabel(){
    return this.queryLabel;
  }

  public setQueryKey(key : any){
    this.queryKey = key;
  }
  
  public getQueryKey(){
    return this.queryKey;
  }

  public setQueryTitle(title : any){
    this.queryTitle = title;
  }
  
  public getQueryTitle(){
    return this.queryTitle;
  }

  public setQueryOrg(org : any){
    this.queryOrg = org;
  }
  
  public getQueryOrg(){
    return this.queryOrg;
  }

  public setUpdateQuery(status:boolean)
  {
    this.queryUpdateStatus=status;
  }

  public getUpdateQuery()
  {
    return this.queryUpdateStatus;
  }

  public setQueryId(queryId:any)
  {
    this.queryId=queryId;
  }
  public getQueryId()
  {
    return this.queryId;
  }
  public setIsPinned(pin:boolean)
  {
    this.isPin=pin;
  }
  public getIsPinned()
  {
    return this.isPin;
  }
  public setIsTrendCapture(trend:boolean)
  {
    this.isTrend=trend;
  }
  public getIsTrendCapture()
  {
    return this.isTrend;
  }
}

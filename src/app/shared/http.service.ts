import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient,private httpWithoutInterceptor:HttpClient, private httpbackend:HttpBackend) {
    this.httpWithoutInterceptor= new HttpClient(httpbackend);
   }

  //get organisation list inside autocomplete search
  getData(orgName: any) {
    return this.http.get(environment.apiUrl + '/org/' + orgName);
  }

  //token authentication
  public getAuthentication() {
    return this.http.get(environment.apiUrl + '/auth');
  }

  //get Organisation profile name,pic and url
  public getOrgProfile(orgLogin: any) {
    return this.http.get(environment.apiUrl + '/org/' + orgLogin + '/orgProfile');
  }

  //create a url to fetch 1st 100 repo
  public getRepoList(orgLogin: any) {
    return this.http.get(environment.apiUrl + '/org/' + orgLogin + '/repo');
  }

  //create a url to fetch next page data
  public getNextPageRepoList(nextPageHash: any, orgLogin: any) {
    return this.http.get(environment.apiUrl + '/org/' + orgLogin + '/repo/more', {
      headers: new HttpHeaders({
        EndCursor: nextPageHash
      }),
    });
  }

  //repository list from api by name inside autocomplete search
  public getRepositoryLisByName(orgLogin: any, repoName: any) {
    return this.http.get(environment.apiUrl + '/org/' + orgLogin + '/repo/' + repoName);
  }

  // critical issues
  public getcriticalIssue(orgLogin: any, days: any, repoListObject: any) {
    return this.http.post<any>(environment.apiUrl + '/org/' + orgLogin + '/repo/issuesWithPriority1/openSinceBefore/' + days, repoListObject);
  }

  // average resolving time for Priority-1 isuues
  public getAvgTimeP1(orgLogin: any) {
    return this.http.get(environment.apiUrl + '/org/' + orgLogin + '/averageResolvingTimeOfP1Issues');
  }

  // average resolving time for Priority-2 isuues
  public getAvgTimeP2(orgLogin: any) {
    return this.http.get(environment.apiUrl + '/org/' + orgLogin + '/averageResolvingTimeOfP2Issues');
  }

  // getting lables
  public getlablesservice(orgLogin: any, repoListObject: any) {
    return this.http.post<any>(environment.apiUrl + '/org/' + orgLogin + '/repo/labels', repoListObject);
  }

  // issuer on lables
  public getlebelissueservice(orgLogin: any, repoListObject: any, label: any) {
    return this.http.post<any>(environment.apiUrl + '/org/' + orgLogin + '/repo/' + label + '/openIssues', repoListObject);
  }

  //idel PR since X days
  public idlePr(orgLogin: any, days: any, jsonArr: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/org/' + orgLogin + '/repo/prLastUpdate/' + days, jsonArr);
  }

  //unmerged PR since X days
  public unmergedpr(orgLogin: any, days: any, jsonArr: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/org/' + orgLogin + '/repo/prUnMerged/' + days, jsonArr);
  }

  //registeration functionality 
  public register(RegistrationFormGroup: any): Observable<any> {
    return this.httpWithoutInterceptor.post<any>(environment.apiUrl + '/user/register', RegistrationFormGroup);
  }

  //login functionlity
  public login(LoginFormGroup: any): Observable<any> {
    return this.httpWithoutInterceptor.post<any>(environment.apiUrl + '/user/login', LoginFormGroup);
  }

  //update token
  public updateToken(LoginToken: any): Observable<any> {
    return this.httpWithoutInterceptor.post<any>(environment.apiUrl + '/user/updateToken', LoginToken);
  }

  //save query
  public saveQueryCall(repoList: any,params:HttpParams): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/user/saveQuery', repoList,{params});
  }

  //show query list
  public getSaveQueryList(userId:any)
  {
    return this.http.get(environment.apiUrl+'/user/getQueries/'+userId);
  }

  //save query result
  public getSaveQueryResult(repoList: any,params:HttpParams,queryId:any): Observable<any>{
    return this.http.post<any>(environment.apiUrl + '/user/queryResult/' + queryId,repoList,{params});
  }


  //pin query
  public pinQuery(userId:any,queryId:any): Observable<any>{
    return this.http.get(environment.apiUrl+ '/user/'+ userId +'/setPinned/' + queryId);
  }

  //unset pin query
  public unsetPinQuery(queryId:any): Observable<any>{
    return this.http.get(environment.apiUrl+'/user/unsetPinned/'+queryId);
  }

  //trend query
  public trendQuery(userId:any,queryId:any): Observable<any>{
    return this.http.get(environment.apiUrl+ '/user/'+ userId +'/setTrendCapture/' + queryId);
  }

  //unset trend query
  public unsetTrendQuery(queryId:any): Observable<any>{
    return this.http.get(environment.apiUrl+'/user/unsetTrendCapture/'+queryId);
  }

  //edit saved result
  public editSaveQuery(repoList: any,params:HttpParams,queryId:any): Observable<any>{
    return this.http.post<any>(environment.apiUrl+ '/user/updateQuery/'+ queryId, repoList,{params});
  }

  // trend result
  public getTrendResult(userID){
    return this.http.get(environment.apiUrl+'/user/'+ userID +'/getTrendResults');
  }

  // trend list
  public getTrendList(userID){
    return this.http.get(environment.apiUrl+'/user/'+ userID +'/getListOfTrendCapturedQueries');
  }

  // remove trend query
  public unsetTrendResult(queryID){
    return this.http.get(environment.apiUrl+'/user/unsetTrendCapture/'+ queryID)
  }

  // delete saved query
  public deleteQuery(queryId:any){
    return this.http.get(environment.apiUrl+'/user/deleteQuery/'+queryId);
  }

  // pinned query result
  public getPinnedResult(userID){
    return this.http.get(environment.apiUrl+'/user/'+ userID +'/getPinnedResults')
  }

  // remove pinned query
  public unsetPinnedResult(queryID){
    return this.http.get(environment.apiUrl+'/user/unsetPinned/'+ queryID)
  } 
}
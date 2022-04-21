import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private URL = '';
  private OrgProfileUrl = '';
  private repoListUrl = '';
  private repoSearchUrl = '';
  private idlePrUrl='';
  private unmergedPrUrl='';
  private tokenURL = '';
  private criticalIssue = '';
  private AvgTimeP1 = '';
  private AvgTimeP2 = '';
  private userUrl=''; 

  constructor(private http: HttpClient) { }

  //get organisation list inside autocomplete search
  getData(authToken: any, orgName: any) {
    this.URL = environment.apiUrl +'/org/'+ orgName;
    return this.http.get(this.URL, {
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }

  //token authentication
  public getAuthentication(tokenValue: any) {
    this.tokenURL=environment.apiUrl+'/auth';
    return this.http.get(this.tokenURL, {
      headers: new HttpHeaders({
        Authorization: tokenValue,
      }),
    });
  }

  //get Organisation profile name,pic and url
  public getOrgProfile(authToken: any, orgLogin: any) {
    this.OrgProfileUrl = environment.apiUrl + '/org/' +orgLogin + '/orgProfile';
    return this.http.get(this.OrgProfileUrl, {

      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }

  //create a url to fetch 1st 100 repo
  public getRepoList(authToken: any, orgLogin: any) {
    this.repoListUrl = environment.apiUrl +'/org/' + orgLogin + '/repo';
    return this.http.get(this.repoListUrl, {
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }

  //create a url to fetch next page data
  public getNextPageRepoList(authToken: any, nextPageHash: any, orgLogin: any) {
    this.repoListUrl = environment.apiUrl +'/org/' + orgLogin + '/repo/more';
    return this.http.get(this.repoListUrl, {
      headers: new HttpHeaders({
        Authorization: authToken,
        EndCursor: nextPageHash
      }),
    });
  }

  //repository list from api by name inside autocomplete search
  public getRepositoryLisByName(authToken: any, orgLogin: any, repoName: any) {
    this.repoSearchUrl = environment.apiUrl+'/org/' +orgLogin+'/repo/'+repoName;
    return this.http.get(this.repoSearchUrl,{
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }
  
  // critical issues
  public getcriticalIssue(authToken: any, orgLogin: any, days: any,repoListObject:any){
    this.criticalIssue = environment.apiUrl+'/org/' +orgLogin+'/repo/issuesWithPriority1/openSinceBefore/'+days ;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken,
      })
    };
    return this.http.post<any>(this.criticalIssue, repoListObject, httpOptions);
  }

  // average resolving time for Priority-1 isuues
  public getAvgTimeP1(authToken: any, orgLogin: any){
    this.AvgTimeP1 = environment.apiUrl + '/org/' + orgLogin + '/averageResolvingTimeOfP1Issues';
    return this.http.get(this.AvgTimeP1, {headers: new HttpHeaders({Authorization: authToken})});
  }

  // average resolving time for Priority-2 isuues
  public getAvgTimeP2(authToken: any, orgLogin: any){
    this.AvgTimeP2 = environment.apiUrl + '/org/' + orgLogin + '/averageResolvingTimeOfP2Issues';
    return this.http.get(this.AvgTimeP2, {headers: new HttpHeaders({Authorization: authToken})});
  }

  //idel PR since X days
  public idlePr(authToken:any,orgLogin:any,days:any,jsonArr:any): Observable<any>
  { 
    this.idlePrUrl=environment.apiUrl+'/org/' +orgLogin+'/repo/prLastUpdate/'+days;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken,
      })
    };
    return this.http.post<any>(this.idlePrUrl, jsonArr, httpOptions);
  }

  //unmerged PR since X days
  public unmergedpr(authToken:any,orgLogin:any,days:any,jsonArr:any): Observable<any>
  {    
    this.unmergedPrUrl=environment.apiUrl+'/org/' +orgLogin+'/repo/prUnMerged/'+days;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken,
      })
    };
    return this.http.post<any>(this.unmergedPrUrl, jsonArr, httpOptions);
  }
  
  //registeration functionality 
  public register(Token:any,email:any,passWord:any): Observable<any>
  {
    this.userUrl=environment.apiUrl+'/user/register';
    let data={
      "bearerToken":Token,
      "email":email,
      "password":passWord,
    }
    return this.http.post<any>(this.userUrl, data);
  }

}
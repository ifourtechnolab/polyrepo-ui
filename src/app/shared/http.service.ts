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
  private Loginurl='';

  constructor(private http: HttpClient) { }

  //get organisation list inside autocomplete search
  getData(orgName: any) {
    this.URL = environment.apiUrl +'/org/'+ orgName;
    return this.http.get(this.URL);
  }

  //token authentication
  public getAuthentication() {
    this.tokenURL=environment.apiUrl+'/auth';
    return this.http.get(this.tokenURL);
  }

  //get Organisation profile name,pic and url
  public getOrgProfile(orgLogin: any) {
    this.OrgProfileUrl = environment.apiUrl + '/org/' +orgLogin + '/orgProfile';
    return this.http.get(this.OrgProfileUrl);
  }

  //create a url to fetch 1st 100 repo
  public getRepoList(orgLogin: any) {
    this.repoListUrl = environment.apiUrl +'/org/' + orgLogin + '/repo';
    return this.http.get(this.repoListUrl);
  }

  //create a url to fetch next page data
  public getNextPageRepoList( nextPageHash: any, orgLogin: any) {
    this.repoListUrl = environment.apiUrl +'/org/' + orgLogin + '/repo/more';
    return this.http.get(this.repoListUrl,{
      headers: new HttpHeaders({
        EndCursor: nextPageHash
      }),
    });
  }

  //repository list from api by name inside autocomplete search
  public getRepositoryLisByName(orgLogin: any, repoName: any) {
    this.repoSearchUrl = environment.apiUrl+'/org/' +orgLogin+'/repo/'+repoName;
    return this.http.get(this.repoSearchUrl);
  }
  
  // critical issues
  public getcriticalIssue(orgLogin: any, days: any,repoListObject:any){
    this.criticalIssue = environment.apiUrl+'/org/' +orgLogin+'/repo/issuesWithPriority1/openSinceBefore/'+days ;
    return this.http.post<any>(this.criticalIssue, repoListObject);
  }

  // average resolving time for Priority-1 isuues
  public getAvgTimeP1(orgLogin: any){
    this.AvgTimeP1 = environment.apiUrl + '/org/' + orgLogin + '/averageResolvingTimeOfP1Issues';
    return this.http.get(this.AvgTimeP1);
  }

  // average resolving time for Priority-2 isuues
  public getAvgTimeP2(orgLogin: any){
    this.AvgTimeP2 = environment.apiUrl + '/org/' + orgLogin + '/averageResolvingTimeOfP2Issues';
    return this.http.get(this.AvgTimeP2);
  }

  //idel PR since X days
  public idlePr(orgLogin:any,days:any,jsonArr:any): Observable<any>
  { 
    this.idlePrUrl=environment.apiUrl+'/org/' +orgLogin+'/repo/prLastUpdate/'+days;
    
    return this.http.post<any>(this.idlePrUrl, jsonArr);
  }

  //unmerged PR since X days
  public unmergedpr(orgLogin:any,days:any,jsonArr:any): Observable<any>
  {    
    this.unmergedPrUrl=environment.apiUrl+'/org/' +orgLogin+'/repo/prUnMerged/'+days;
    return this.http.post<any>(this.unmergedPrUrl, jsonArr);
  }
  
  //registeration functionality 
  public register(RegistrationFormGroup:any): Observable<any>
  {
    this.userUrl=environment.apiUrl+'/user/register';
    let data={
      "bearerToken":RegistrationFormGroup.token,
      "email":RegistrationFormGroup.email,
      "password":RegistrationFormGroup.password,
    }
    return this.http.post<any>(this.userUrl, data);
  }

  //login functionlity
  public login(LoginFormGroup:any):Observable<any>
  {
    this.Loginurl=environment.apiUrl+'/user/login';
    return this.http.post<any>(this.Loginurl,LoginFormGroup);
  }

}
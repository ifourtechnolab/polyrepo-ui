import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private URL = '';
  private OrgProfileUrl = '';
  private repoListUrl = '';
  private issueUrl = '';
  private repoSearchUrl = '';
  private tokenURL = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/auth/';

  constructor(private http: HttpClient) { }

  getData(authToken: any, orgName: any) {
    this.URL = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/' + orgName;
    return this.http.get(this.URL, {
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }

  public getAuthentication(tokenValue: any) {
    return this.http.get(this.tokenURL, {
      headers: new HttpHeaders({
        Authorization: tokenValue,
      }),
    });
  }

  public getOrgProfile(authToken: any, orgLogin: any) {
    this.OrgProfileUrl = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/' + orgLogin + '/orgProfile';
    return this.http.get(this.OrgProfileUrl, {

      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }

  public getRepoList(authToken: any, orgLogin: any) {
    this.repoListUrl = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/' + orgLogin + '/repo';
    return this.http.get(this.repoListUrl, {
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }
  public getNextPageRepoList(authToken: any, nextPageHash: any, orgLogin: any) {
    //create a url to fetch next page data
    this.repoListUrl = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/' + orgLogin + '/repo/more';
    return this.http.get(this.repoListUrl, {
      headers: new HttpHeaders({
        Authorization: authToken,
        EndCursor: nextPageHash
      }),
    });
  }

  public getIssueList(authToken: any, orgLogin: any, repoList: any): Observable<any> {
    this.issueUrl = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/' + orgLogin + '/repo/issuesWithPriority1';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken,
      })
    };
    return this.http.post<any>(this.issueUrl, repoList, httpOptions);
  }

  public getRepositoryLisByName(authToken: any, orgLogin: any, repoName: any) {
    this.repoSearchUrl = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/'+orgLogin+'/repo/'+repoName;
    return this.http.get(this.repoSearchUrl,{
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }
}
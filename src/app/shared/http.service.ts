import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private URL = '';
  private OrgProfileUrl = '';
  private repoListUrl='';
  private tokenURL = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/auth/';

  constructor(private http: HttpClient) {}

  getData(authToken: any, orgName: any) 
  {
    this.URL = 'http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/' + orgName;
    return this.http.get(this.URL, {
      headers: new HttpHeaders({
        Authorization: authToken,
      }),
    });
  }

  public getAuthentication(tokenValue: any) 
  {
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

  public getRepoList(authToken: any, orgLogin: any){
    this.repoListUrl='http://192.168.0.181:8080/v.0.1/polyrepo/analyser/org/'+orgLogin+'/repo';
    return this.http.get(this.repoListUrl,{
      headers: new HttpHeaders({
        Authorization: authToken,

      }),
    });
  }
  
  
}

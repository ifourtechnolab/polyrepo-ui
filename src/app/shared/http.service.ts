import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private URL = "";
  private tokenURL="http://192.168.0.181:8080/polyrepo/analyser/auth/";


  constructor(private http : HttpClient) { }

  // data(pqr : string){
  //   let dataItem = pqr;
  // }

  getData(authToken:any,orgName:any){
    this.URL = "http://192.168.0.181:8080/polyrepo/analyser/org/"+orgName;
    return this.http.get(this.URL,{headers:new HttpHeaders({
      'Authorization':authToken,
    })
  });
}

  public getAuthentication(tokenValue:any)
  {
    return this.http.get(this.tokenURL,{headers:new HttpHeaders({
      'Authorization':tokenValue,
    })});
  }

}

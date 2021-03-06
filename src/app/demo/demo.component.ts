import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  tokenValue: any;
  orgName: any;
  authToken: any;
  isdisable:boolean=true;
  login: any;
  orgProfileData: any;
  orgLogin: any;
  loginForm = new FormGroup({
    token: new FormControl('', [Validators.required]),
    organizationName: new FormControl({value:'', disabled: true}, [Validators.required]),
  });

  filterOrganization!: Observable<string[]>;
  organizationsData: any;

  constructor(private http: HttpService, public router: Router) {}

  ngOnInit() {}

  public getToken() {
    this.tokenValue = this.loginForm.value.token;

    this.http
      .getAuthentication(this.tokenValue)
      .subscribe((validationData: any) => {
        console.log(validationData.message);
        if (validationData.message === 'Valid Token') {
          localStorage.setItem('token', this.tokenValue);
          this.loginForm.controls['organizationName'].enable();
        } else {
          localStorage.removeItem('token');
          alert('Please entered Valid token');
          this.loginForm.controls['organizationName'].disable();
          this.loginForm.controls['organizationName'].reset();
          this.isdisable=true;
        }
      });
  }

  public getOrganization() {
    this.orgName = this.loginForm.value.organizationName;
    this.authToken = localStorage.getItem('token');
    console.log('Token:' + this.authToken);
    if (this.orgName != '') {
      this.http
        .getData(this.authToken, this.orgName)
        .subscribe((orgNameData: any) => {
          this.organizationsData = _.merge([], orgNameData.edges);
        });
    }
  }

  get token() {
    return this.loginForm.get('token');
  }

  get organizationName() {
    return this.loginForm.get('organizationName');
  }

  routeToRepository(){
    this.router.navigate(['/repository-page']);    
  }
  public searchvisibility()
  {
    if(this.orgName=='')
    {
      this.isdisable=true;
    }
    else
    {
      this.isdisable=false;
    }
  }

  changeName(event: any){
   
    this.login = this.organizationsData[event].node.login;
    localStorage.setItem('orgLogin', this.login);
  }
}

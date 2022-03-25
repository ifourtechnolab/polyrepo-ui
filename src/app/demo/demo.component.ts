import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import {Observable} from 'rxjs';
import {startWith, map, debounceTime} from 'rxjs/operators';
import * as _ from 'lodash';
import { values } from 'lodash';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})


export class DemoComponent implements OnInit {


  tokenValue :any;
  orgName: any;
  authToken: any;

  loginForm = new FormGroup({
    token : new FormControl('',[Validators.required]),
    organizationName : new FormControl('',[Validators.required])
  })
  
 
  filterOrganization !: Observable<string[]>;
  organizationsData : any;

  constructor( private http : HttpService) { }

  ngOnInit() {
    // debugger
    // this.organizationsData = _.merge([],this.organizations);
    // this.loginForm.get("organizationName")?.valueChanges.subscribe((value) => {
    //   debugger
    //   this.http.getData(value).subscribe((res)=>{
    //     debugger
    //     debounceTime(1000)
    //   })
    //  this.organizationsData  =  this._filter(value)
    // });
    // var data= this.organizationName?.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
  }


  private _filter(value : string){
    // const filterValue = value.toLowerCase();
    // return this.organizations.filter( organizations => organizations.toLowerCase().includes(filterValue));
    // return this.organizations.filter( (option: { node: { name: string; }; }) => option.node.name.toLowerCase().indexOf(value.toLowerCase())===0);
  }

  public fuser()
  {
    this.tokenValue=this.loginForm.value.token;
   
    this.http.getAuthentication(this.tokenValue).subscribe((validationData:any)=>{
      console.log(validationData.message);
      if(validationData.message==="Valid Token")
      {
        localStorage.setItem('token',this.tokenValue);
      }
      else
      {
        localStorage.removeItem('token');
        alert('Please entered Valid token');
      }
    })    
  }

  public forganization()
  {
    this.orgName=this.loginForm.value.organizationName;
    this.authToken = localStorage.getItem('token');
    console.log("Token:"+this.authToken);
    if(this.orgName != ""){
    this.http.getData(this.authToken,this.orgName).subscribe((orgNameData:any)=>{
      // debounceTime(5000)
      this.organizationsData = _.merge([],orgNameData.edges);
      // this.organizationsData = orgNameData
      // var data= this.organizationName?.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value))
      // );
    })
    }

    // this.organizationsData = _.merge([],this.organizations);
    // this.loginForm.get("organizationName")?.valueChanges.subscribe((value) => {
    //   debugger
    //   this.http.getData(value).subscribe(()=>{
    //     debugger
    //     debounceTime(1000)
    //   })
    //  this.organizationsData  =  this._filter(value)
    // });
    // var data= this.organizationName?.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

  }


  get token(){
    return this.loginForm.get('token');
  }

  get organizationName(){
    return this.loginForm.get('organizationName');
  }
}



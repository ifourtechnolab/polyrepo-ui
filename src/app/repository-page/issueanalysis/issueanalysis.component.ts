import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-issueanalysis',
  templateUrl: './issueanalysis.component.html',
  styleUrls: ['./issueanalysis.component.css']
})
export class IssueanalysisComponent implements OnInit {

  authToken : any;
  orgName : any;
  days : any;

  show : any;

  criticalIssuesForm = new FormGroup({
    criticalIssues: new FormControl('')
  })

  AvgTimeForm = new FormGroup({
    criticalIssues: new FormControl('')
  })

  constructor(public http : HttpService) { }

  ngOnInit(): void { }

  test(){
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');
    this.days = this.criticalIssuesForm.value.criticalIssues;

    this.http.abc(this.authToken,this.orgName,this.days).subscribe(res => {
      console.log(res);
    });
  }
}

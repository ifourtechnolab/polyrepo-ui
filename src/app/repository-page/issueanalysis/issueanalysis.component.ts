import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-issueanalysis',
  templateUrl: './issueanalysis.component.html',
  styleUrls: ['./issueanalysis.component.css']
})
export class IssueanalysisComponent implements OnInit {

  fform = new FormGroup({
      days: new FormControl('')
    })

  constructor() { }

  ngOnInit(): void { }
}

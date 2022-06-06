import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
interface repoList {
  id: string;
  name: string;
}
@Component({
  selector: 'app-showquerydetails',
  templateUrl: './showquerydetails.component.html',
  styleUrls: ['./showquerydetails.component.css']
})
export class ShowquerydetailsComponent implements OnInit {
  fform = new FormGroup({
    title: new FormControl(''),
    org: new FormControl(''),
    day: new FormControl(''),
    label: new FormControl(''),
    pinned: new FormControl(''),
    trendCaptured:new FormControl(''),
  });
  queryDetail: any;
  paramList : any;
  showDays:boolean=false;
  showLabel:boolean=false;
  showRepo:boolean=false;
  nameOfItem: repoList[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.queryDetail = this.data.query;
    this.paramList = this.queryDetail.paramList;
   }

  ngOnInit(): void {
    if (this.queryDetail.repoList[0].repoName != null) {
      this.showRepo = true;
      this.nameOfItem = this.queryDetail.repoList.map((x: any) => {return {id: x.repoName,name: x.repoName};});
    }
    if ((this.paramList.filter(function (obj) { return (obj.paramName == 'days'); })).length > 0) {
      this.showDays=true;
      this.fform.get('day').setValue(this.paramList.filter(function (obj) { return (obj.paramName == 'days'); })[0].paramValue);
    }
    if ((this.paramList.filter(function (obj) { return (obj.paramName == 'label'); })).length > 0) {
      this.showLabel=true;
      this.fform.get('label').setValue(this.paramList.filter(function (obj) { return (obj.paramName == 'label'); })[0].paramValue);
    }
    
    // if(repo)
    this.fform.get('title').setValue(this.queryDetail.title);
    this.fform.get('org').setValue(this.paramList.filter(function (obj) { return (obj.paramName == 'orgName'); })[0].paramValue);
    
    if (this.queryDetail.isPinned == true) {
      this.fform.get('pinned').setValue("Yes");
    }
    else {
      this.fform.get('pinned').setValue("No");
    }
    if (this.queryDetail.isTrend == true) {
      this.fform.get('trendCaptured').setValue("Yes");
    }
    else {
      this.fform.get('trendCaptured').setValue("No");
    }
  }

}

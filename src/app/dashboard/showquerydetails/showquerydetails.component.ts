import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showquerydetails',
  templateUrl: './showquerydetails.component.html',
  styleUrls: ['./showquerydetails.component.css']
})
export class ShowquerydetailsComponent implements OnInit {

  queryDetail: any;
  paramList : any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.queryDetail = this.data.query;
    this.paramList = this.queryDetail.paramList;
   }

  ngOnInit(): void {
  }

}

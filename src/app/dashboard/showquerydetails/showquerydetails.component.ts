import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showquerydetails',
  templateUrl: './showquerydetails.component.html',
  styleUrls: ['./showquerydetails.component.css']
})
export class ShowquerydetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}

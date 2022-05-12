import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-savequery',
  templateUrl: './savequery.component.html',
  styleUrls: ['./savequery.component.css']
})
export class SavequeryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  fform = new FormGroup({
    title: new FormControl('',),
  });
}

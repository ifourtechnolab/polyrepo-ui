import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-pranalysis',
  templateUrl: './pranalysis.component.html',
  styleUrls: ['./pranalysis.component.css']
})
export class PranalysisComponent implements OnInit {
  
  fform = new FormGroup({
    ActivityPrDay: new FormControl('',),
  });
  fform2 = new FormGroup({
    MergePrDay:new FormControl('', ),
  });
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { AddrepositoryComponent } from '../addrepository/addrepository.component';

@Component({
  selector: 'app-show-repository',
  templateUrl: './show-repository.component.html',
  styleUrls: ['./show-repository.component.css'],
})
export class ShowRepositoryComponent implements OnInit {
 
  repoName!:string ;
  
  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void { }

  openDialog() {
    this.matDialog.open(AddrepositoryComponent);
    const openDialog = this.matDialog.open(AddrepositoryComponent);
    // .afterClosed().subscribe((res:any)=>{
    //   debugger
    //   this.repopenDialogoName=res.name;
    // });
  }
}
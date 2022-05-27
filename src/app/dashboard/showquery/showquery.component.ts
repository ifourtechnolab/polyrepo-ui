import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { HttpService } from 'src/app/shared/http.service';
import { UtilService } from 'src/app/shared/util.service';
import { ShowquerydetailsComponent } from '../showquerydetails/showquerydetails.component';
import { ShowqueryresultComponent } from '../showqueryresult/showqueryresult.component';
import { Router } from '@angular/router';

export interface QueryParamData{
  paramName:any;
  paramValue:any;
}
export interface QueryRepoData{
  id: string;
  repoName: string;
}
export interface QueryData {
  title: any;
  queryKey:any;
  id:any;
  paramList:QueryParamData[];
  repoList:QueryRepoData[];
}
@Component({
  selector: 'app-showquery',
  templateUrl: './showquery.component.html',
  styleUrls: ['./showquery.component.css']
})
export class ShowqueryComponent implements OnInit {
  displayedColumns: string[] = ['title', 'showResult', 'action'];
  dataSource!: MatTableDataSource<QueryData>;
  queryDataList:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('page1') paginator: MatPaginator;
  constructor(private http: HttpService,private util:UtilService,public matDialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.showQueryList();
  }
  public showQueryList()
  {
    this.http.getSaveQueryList(this.util.getUserId()).subscribe((result:any)=>{
      this.queryDataList=_.merge([],result);
      this.queryDataList = this.queryDataList.filter(record => record !== null);
      this.queryDataList=this.queryDataList.map((x:any)=>{
        return{
          title:x.storedQuery.title,
          queryKey:x.storedQuery.queryKey,
          id:x.storedQuery.id,
          repoList:x.queryRepoList,
          paramList:x.queryParameterList
        }
      })
      this.dataSource = new MatTableDataSource<QueryData>(this.queryDataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getResult(querydata: any) {
    this.router.navigate(['repo'],{state : {data: querydata}});
  }

  getQueryDetails(querydata: any) {
    const openDialog = this.matDialog.open(ShowquerydetailsComponent, { disableClose: true, hasBackdrop: true, data: { query: querydata }});
  }

}
  
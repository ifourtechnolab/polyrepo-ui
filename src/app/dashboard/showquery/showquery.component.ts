import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { HttpService } from 'src/app/shared/http.service';
import { UtilService } from 'src/app/shared/util.service';
import { ShowquerydetailsComponent } from '../showquerydetails/showquerydetails.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  paramList:QueryParamData[];
  repoList:QueryRepoData[];
  isPinned: boolean;
  isTrend: boolean;
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
  constructor(private http: HttpService,private util:UtilService,public matDialog: MatDialog,
     public router: Router) { }

  ngOnInit(): void {
    this.showQueryList();
  }
  public showQueryList()
  {
    // this.id=this.util.getQueryId();
    this.http.getSaveQueryList(this.util.getUserId()).subscribe((result:any)=>{
      this.queryDataList=_.merge([],result);
      this.queryDataList = this.queryDataList.filter(record => record !== null);
      this.queryDataList=this.queryDataList.map((x:any)=>{
        return{
          title:x.storedQuery.title,
          queryKey:x.storedQuery.queryKey,
          id:x.storedQuery.queryId,
          repoList:x.queryRepoList,
          paramList:x.queryParameterList,
          isPinned:x.storedQuery.pinned,
          isTrend:x.storedQuery.trendCaptured
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
  openDialogDelete(id:any,title:any)
  {
    const openDialog = this.matDialog.open(DeleteQuery, { disableClose: true, hasBackdrop: true, data: { id: id, title: title } });
    openDialog.afterClosed().subscribe((result) => {
      this.showQueryList();
    });
  }
}

@Component({
  selector: 'delete-query',
  templateUrl: './deletequery.html',
  styleUrls: ['./showquery.component.css']

})
export class DeleteQuery {
  constructor(
    public dialogRef: MatDialogRef<DeleteQuery>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private http: HttpService,
    private toastr: ToastrService  ) {}
    ngOnInit() {
      this.dialogRef.updatePosition({ top: `20px`});
    }
  title:any=this.data.title;
  close(): void {
    this.dialogRef.close();
  }
  deleteQuery()
  {
    this.http.deleteQuery(this.data.id).subscribe((res:any)=>{
          if(res.message=='Query deleted')
          {
            this.deleteQueryToast('Query deleted successfully');
            this.dialogRef.close();
          }
          else
          {
            this.deleteQueryToast('Query not deleted successfully');
            this.dialogRef.close();
          }
        });
  }
  deleteQueryToast(msg: any) {
    this.toastr.success(msg, '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 300,
      timeOut:800
    });
  }
}


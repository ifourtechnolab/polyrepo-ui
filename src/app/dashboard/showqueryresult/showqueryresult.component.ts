import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { HttpService } from 'src/app/shared/http.service';
export interface PullRequestData {
  authorLogin: any;
  repository: any;
  title: any;
  updatedAt: any;
}
export interface UnmergedPRData {
  authorLogin: any;
  repository: any;
  title: any;
  createdAt: any;
}
export interface IssueData {
  title: any;
  createdAt: any;
  repository: any;
  authorLogin: any;
}
export interface labelData {
  title: any;
  repository: any;
}
@Component({
  selector: 'app-showqueryresult',
  templateUrl: './showqueryresult.component.html',
  styleUrls: ['./showqueryresult.component.css']
})
export class ShowqueryresultComponent implements OnInit {

  queryDetail: any;
  paramList: any;
  repoListData: any;
  recentData: any;
  loading: boolean;
  orgName:any;
  isCriticalIssue = false;
  isP1Average = false;
  isP2Average = false;
  isLabel = false;
  isUnmergedPR = false;
  isIdlePR = false;

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService) { }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loading = true;
    this.showQueryData();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public showQueryData(){    
    this.queryDetail = this.data.query;
    this.paramList = this.queryDetail.paramList;
    this.orgName = this.paramList.filter(function (obj) { return (obj.paramName == 'orgName'); })[0].paramValue;
    
    let params = new HttpParams()
      .set('queryKey', this.queryDetail.queryKey)
      .set('orgUserName', this.orgName);
    if ((this.paramList.filter(function (obj) { return (obj.paramName == 'days'); })).length > 0) {
      params = params.append('days', this.paramList.filter(function (obj) { return (obj.paramName == 'days'); })[0].paramValue);
    }
    if ((this.paramList.filter(function (obj) { return (obj.paramName == 'label'); })).length > 0) {
      params = params.append('label', this.paramList.filter(function (obj) { return (obj.paramName == 'label'); })[0].paramValue);
    }
    if (this.queryDetail.repoList[0].repoName != null) {
      this.repoListData = this.queryDetail.repoList.map((x: any) => {return {id: x.repoName,name: x.repoName};});
      this.repoListData = { "repoNames": this.repoListData };
    }

    this.http.getSaveQueryResult(this.repoListData, params, this.queryDetail.id).subscribe((Data: any) => {
      this.recentData = Data;
      if(this.recentData.queryKey=='getPullRequestNotUpdatedByDaysQuery'){
        this.displayedColumns = ['title', 'updatedAt', 'repository', 'authorLogin'];
        this.recentData = _.merge([], this.recentData.search.nodes);
        this.recentData = this.recentData.map((x: any) => {
          return {
            title: x.title,
            updatedAt: x.updatedAt,
            repository: x.repository.name,
            authorLogin: x.author.login,
            authorUrl: x.author.url,
          }
        });
        this.loading=false;
        this.dataSource = new MatTableDataSource<PullRequestData>(this.recentData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
        this.isIdlePR = true;
      }else if(this.recentData.queryKey=='getUnMergedPullRequestByDayQuery'){
        this.displayedColumns = ['title', 'createdAt', 'repository', 'authorLogin'];
        this.recentData = _.merge([], this.recentData.search.nodes);
        this.recentData = this.recentData.map((x: any) => {
          return {
            title: x.title,
            createdAt: x.createdAt,
            repository: x.repository.name,
            authorLogin: x.author.login,
            authorUrl: x.author.url,
          }
        });
        this.loading = false;
        this.dataSource = new MatTableDataSource<UnmergedPRData>(this.recentData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
        this.isCriticalIssue = true;
      }
      else if(this.recentData.queryKey=='getClosedP1IssuesTimeQuery'){
        this.loading = false;
        this.isP1Average = true;
      }else if(this.recentData.queryKey=='getClosedP2IssuesTimeQuery'){
        this.loading = false;
        this.isP2Average = true;
      }else if(this.recentData.queryKey=='getPriority1IssuesOpenedBeforeXDaysQuery'){
        this.displayedColumns = ['title', 'createdAt', 'repository', 'authorLogin'];
        this.recentData = _.merge([], this.recentData.search.edges);
        this.recentData = this.recentData.map((x: any) => {
          return {
            title: x.node.title,
            createdAt: x.node.createdAt,
            repository: x.node.repository.name,
            authorLogin: x.node.author.login,
            authorUrl: x.node.author.url,
          };
        });
        this.loading = false;
        this.dataSource = new MatTableDataSource<IssueData>(this.recentData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
        this.isCriticalIssue = true;
      }else if(this.recentData.queryKey=='getOpenIssueNamesByLabel'){
        this.displayedColumns = ['title', 'labelRepository'];
        this.recentData = _.merge([], this.recentData.nodes);
          this.recentData = this.recentData.map((x: any) => {
            return {
              title: x.title,
              repository: x.repository.name,
            };
          });
          this.loading = false;
          this.dataSource = new MatTableDataSource<labelData>(this.recentData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
          this.isLabel = true;
      }
    });
  }

}

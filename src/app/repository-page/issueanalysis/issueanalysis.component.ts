import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { UtilService } from '../../shared/util.service';
import * as _ from 'lodash';
import {
  FormGroup,
  FormControl,
  FormControlName,
  Validator,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

export interface issueData {
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
  selector: 'app-issueanalysis',
  templateUrl: './issueanalysis.component.html',
  styleUrls: ['./issueanalysis.component.css'],
})

export class IssueanalysisComponent implements OnInit {
  criticalDataSource!: MatTableDataSource<issueData>;
  labelDataSource!: MatTableDataSource<labelData>;
  criticalDisplayedColumns: string[] = ['title', 'createdAt', 'repository','authorLogin'];
  labelDisplayedColumns: string[] = ['title','repository'];
  authToken: any;
  orgName: any;
  days: any;
  priorityOne: any;
  priorityTwo: any;
  show: any;
  selectedRepoList: any;
  repoListObject: any;
  criticalIssueData: any;
  labelIssueData: any;
  isLoading = false;
  abc : any;

  criticalIssuesForm = new FormGroup({
    criticalIssues: new FormControl(''),
  });

  AvgTimeForm = new FormGroup({
    criticalIssues: new FormControl(''),
  });

  @ViewChild('page1') paginator1: MatPaginator;
  @ViewChild('page2') paginator2: MatPaginator;
  @ViewChild('sort1') sort1: MatSort;
  @ViewChild('sort2') sort2: MatSort;

  constructor(
    public http: HttpService,
    private util: UtilService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // TAB-1

  // pagination filter for critical issues 
  criticalApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.criticalDataSource.filter = filterValue.trim().toLowerCase();

    if (this.criticalDataSource.paginator) {
      this.criticalDataSource.paginator = this.paginator1;
    }
  }

  // pagination filter for label issues
  labelApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.labelDataSource.filter = filterValue.trim().toLowerCase();

    if (this.labelDataSource.paginator) {
      this.labelDataSource.paginator = this.paginator2;
    }
  }

  //critical issues data
  criticalIssueList() {
    this.isLoading = true;
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');
    this.days = this.criticalIssuesForm.value.criticalIssues;
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    if (this.selectedRepoList.length === 0) {
      this.isLoading = false;
      this.toastr.error('Please select repository', 'No Repository', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    } else {
      this.http
        .getcriticalIssue(this.orgName,this.days,this.repoListObject)
        .subscribe((res) => {

          res = _.merge([], res.edges);
          this.criticalIssueData = res.map((x: any) => {
            return {
              title: x.node.title,
              createdAt: x.node.createdAt,
              repository: x.node.repository.name,
              authorLogin: x.node.author.login,
              authorUrl: x.node.author.url,
            };
          });
          this.isLoading = false;
          this.criticalDataSource = new MatTableDataSource<issueData>(this.criticalIssueData);
          this.criticalDataSource.paginator = this.paginator1;
          this.criticalDataSource.sort = this.sort1;
        });
    }
  }

  // TAB-2

  // average time for priority-1 issues
  avg1() {
    this.orgName = localStorage.getItem('orgLogin');
    this.http
      .getAvgTimeP1(this.orgName)
      .subscribe((res: any) => {
        this.priorityOne = res.message;
      });
  }

  // average time for priority-2 issues
  avg2() {
    this.orgName = localStorage.getItem('orgLogin');
    this.http
      .getAvgTimeP2(this.orgName)
      .subscribe((res: any) => {
        this.priorityTwo = res.message;
      });
  }

  //TAB-3

  // get labels
  getlabels(){
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');
    if (this.selectedRepoList.length === 0) {
      this.isLoading = false;
      this.toastr.error('Please select repository', 'No Repository', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    }
    this.http
      .getlablesservice(this.orgName, this.repoListObject)
      .subscribe((res: any) => {
        this.abc = res.Labels;
      });
  }

  //get label's data
  getlebelissue(label : any){
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    this.authToken = localStorage.getItem('token');
    this.orgName = localStorage.getItem('orgLogin');
    this.isLoading = true;
    this.repoListObject = { repoNames: this.selectedRepoList };
    if (this.selectedRepoList.length === 0) {
      this.isLoading = false;
      this.toastr.error('Please select repository', 'No Repository', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    } else {
      this.http
      .getlebelissueservice(this.orgName, this.repoListObject, label)
        .subscribe((res) => {
          res = _.merge([], res.nodes);
          this.labelIssueData = res.map((x: any) => {
            return {
              title: x.title,
              repository: x.repository.name,
            };
          });
          this.isLoading = false;
          this.labelDataSource = new MatTableDataSource<labelData>(this.labelIssueData);
          this.labelDataSource.paginator = this.paginator2;
          this.labelDataSource.sort = this.sort2;
        });
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { UtilService } from '../../shared/util.service';
import * as _ from 'lodash';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SavequeryComponent } from '../savequery/savequery.component';
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
  criticalIssuesForm: FormGroup;
  AvgTimeForm: FormGroup;
  criticalDataSource!: MatTableDataSource<issueData>;
  labelDataSource!: MatTableDataSource<labelData>;
  criticalDisplayedColumns: string[] = [
    'issue',
    'createdAt',
    'issueRepository',
    'authorLogin',
  ];
  labelDisplayedColumns: string[] = ['title', 'labelRepository'];
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
  criticalLoading = false;
  labelLoading = false;
  labelList: any;
  isCritic: boolean = true;
  isLabel: boolean = true;
  isAverage: boolean = true;
  CriticalIssueQueryKey: any;
  priorityQueryKey: any;
  labelDataQueryKey: any;
  queryLabel: any;

  @ViewChild('page1') paginator1: MatPaginator;
  @ViewChild('page2') paginator2: MatPaginator;
  @ViewChild('sort1') sort1: MatSort;
  @ViewChild('sort2') sort2: MatSort;

  constructor(
    public http: HttpService,
    private util: UtilService,
    private toastr: ToastrService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.criticalIssuesForm = new FormGroup({
      criticalIssues: new FormControl('0'),
    });

    this.AvgTimeForm = new FormGroup({
      avgIssues: new FormControl(''),
    });
  }

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

  // TAB-1

  //critical issues data
  criticalIssueList() {
    this.criticalLoading = true;
    this.authToken = this.util.getToken();
    this.orgName = localStorage.getItem('orgLogin');
    this.days = this.criticalIssuesForm.value.criticalIssues;
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    if (this.selectedRepoList.length === 0) {
      this.criticalLoading = false;
      this.toastr.error('Please select repository', 'No Repository', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    } else {
      if (this.days == null) {
        this.criticalLoading = false;
        this.toastr.error('Please enter days', '', {
          positionClass: 'toast-top-center',
          closeButton: true,
          easeTime: 250,
        });
      } else {
        this.http
          .getcriticalIssue(this.orgName, this.days, this.repoListObject)
          .subscribe((res) => {
            this.CriticalIssueQueryKey = res.queryKey;
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
            this.criticalLoading = false;
            this.isCritic = false;
            this.criticalDataSource = new MatTableDataSource<issueData>(
              this.criticalIssueData
            );
            this.criticalDataSource.paginator = this.paginator1;
            this.criticalDataSource.sort = this.sort1;
          });
      }
    }
  }

  // TAB-2

  // average time for priority-1 issues
  avg1() {
    this.isAverage = false;
    this.orgName = localStorage.getItem('orgLogin');
    this.http.getAvgTimeP1(this.orgName).subscribe((res: any) => {
      this.priorityOne = res.message;
      this.priorityQueryKey = res.queryKey;
    });
  }

  // average time for priority-2 issues
  avg2() {
    this.isAverage = false;
    this.orgName = localStorage.getItem('orgLogin');
    this.http.getAvgTimeP2(this.orgName).subscribe((res: any) => {
      this.priorityTwo = res.message;
      this.priorityQueryKey = res.queryKey;
    });
  }

  //TAB-3

  // get labels
  getlabels() {
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    this.orgName = localStorage.getItem('orgLogin');
    this.labelLoading = true;
    if (this.selectedRepoList.length === 0) {
      this.labelLoading = false;
      this.toastr.error('Please select repository', 'No Repository', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    } else {
      this.http
        .getlablesservice(this.orgName, this.repoListObject)
        .subscribe((res: any) => {
          this.labelList = res.Labels;
          this.labelLoading = false;
        });
    }
  }

  //get label's data
  getlebelissue(label: any) {
    this.selectedRepoList = this.util.getCollectiveRepoData();
    this.repoListObject = { repoNames: this.selectedRepoList };
    this.orgName = localStorage.getItem('orgLogin');
    this.labelLoading = true
    if (!label) {
      this.labelLoading = false;
      this.toastr.error('Please select label', '', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    } else {
      this.http
        .getlebelissueservice(this.orgName, this.repoListObject, label)
        .subscribe((res) => {
          this.labelDataQueryKey = res.queryKey;
          this.queryLabel = label;
          res = _.merge([], res.nodes);
          this.labelIssueData = res.map((x: any) => {
            return {
              title: x.title,
              repository: x.repository.name,
            };
          });
          this.labelLoading = false;
          this.isLabel = false;
          this.labelDataSource = new MatTableDataSource<labelData>(
            this.labelIssueData
          );
          this.labelDataSource.paginator = this.paginator2;
          this.labelDataSource.sort = this.sort2;
        });
    }
  }

  //Dialog execution on critical issue 
  openDialogCriticalIssue() {
    const openDialog = this.matDialog.open(SavequeryComponent, { disableClose: true, hasBackdrop: true, data: { queryKey: this.CriticalIssueQueryKey, days: this.days } });
    openDialog.afterClosed().subscribe((result) => {
      if (result.data == true) {
        this.isCritic = true;
      }
    });
  }

  //Dialog execution on average resolution time 
  openDialogAverageIssue() {
    const openDialog = this.matDialog.open(SavequeryComponent, { disableClose: true, hasBackdrop: true, data: { queryKey: this.priorityQueryKey } });
    openDialog.afterClosed().subscribe((result) => {
      if (result.data == true) {
        this.isAverage = true;
      }
    });
  }

  //Dialog execution on label 
  openDialogLabelIssue() {
    const openDialog = this.matDialog.open(SavequeryComponent, { disableClose: true, hasBackdrop: true, data: { queryKey: this.labelDataQueryKey, label: this.queryLabel } });
    openDialog.afterClosed().subscribe((result) => {
      if (result.data == true) {
        this.isLabel = true;
      }
    });
  }
}

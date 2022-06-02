import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../shared/http.service';
import { UtilService } from '../../shared/util.service';
import { ToastrService } from 'ngx-toastr';
import { MatCheckboxChange } from '@angular/material/checkbox';
interface repoList {
  id: string;
  name: string;
}
@Component({
  selector: 'app-savequery',
  templateUrl: './savequery.component.html',
  styleUrls: ['./savequery.component.css']
})
export class SavequeryComponent implements OnInit {
  repoList: any;
  repoListObject: any;
  nameOfItem: repoList[] = [];
  showRepo: boolean = false;
  label: any;
  queryId: any;
  showLabel: boolean = false;
  showDays: boolean = false;
  isPin: boolean = false;
  isTrend: boolean = false;
  pinMsg: any;
  trendMsg: any;
  fform = new FormGroup({
    title: new FormControl('',),
    org: new FormControl('',),
    day: new FormControl('',),
    label: new FormControl('',),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpService,
    private util: UtilService,
    private toastr: ToastrService,
    public matDialog: MatDialogRef<SavequeryComponent>) { }

  ngOnInit(): void {

    //display code for org
    if (this.util.getQueryOrg() != null) {
      this.fform.get('org').setValue(this.util.getQueryOrg());
      this.fform.controls['org'].disable();
    } else {
      this.fform.controls['org'].disable();
      this.fform.get('org').setValue(localStorage.getItem('orgLogin'));
    }

    //display code for repo
    this.nameOfItem = this.util.getCollectiveRepoData();
    if (this.nameOfItem.length > 0) {
      this.showRepo = true;
    }
    else {
      this.showRepo = false;
    }

    //display code for label
    if (this.util.getQueryLabel() != null) {
      this.fform.get('label').setValue(this.util.getQueryLabel());
      this.showLabel = true;
      this.fform.controls['label'].disable();
    }
    else if (this.data.label != null) {
      this.fform.get('label').setValue(this.data.label);
      this.showLabel = true;
      this.fform.controls['label'].disable();
    }
    else {
      this.showLabel = false;
    }

    //display code for days
    if (this.util.getQueryDays() != null) {
      this.fform.get('day').setValue(this.util.getQueryDays());
      this.showDays = true;
      this.fform.controls['day'].disable();
    }
    else if (this.data.days != null) {
      this.fform.get('day').setValue(this.data.days);
      this.showDays = true;
      this.fform.controls['day'].disable();
    }
    else {
      this.showDays = false;
    }
  }
  //saveQuery with title
  SaveQuery() {
    let params = new HttpParams()
      .set('userId', this.util.getUserId())
      .set('title', this.fform.value.title)
      .set('queryKey', this.data.queryKey)
      .set('type', this.data.type)
      .set('orgName', localStorage.getItem('orgLogin'));
    if (this.data.days != null) {
      params = params.append('days', this.data.days);
      this.repoList = this.util.getCollectiveRepoData();
      this.repoListObject = { "repoNames": this.repoList };
    }
    if (this.data.label != null) {
      params = params.append("label", this.data.label);
      this.repoList = this.util.getCollectiveRepoData();
      this.repoListObject = { "repoNames": this.repoList };
    }
    
    this.http.saveQueryCall(this.repoListObject, params).subscribe((SaveQueryData: any) => {
      this.queryId = SaveQueryData.id;

      if (SaveQueryData.message == 'Query saved successfully') {
        if (this.isPin && this.isTrend) {
          this.http.pinQuery(this.util.getUserId(), this.queryId).subscribe((pinRes: any) => {
            this.http.trendQuery(this.util.getUserId(), this.queryId).subscribe((trendRes: any) => {
              if (pinRes.message == 'Query Set For Pinned' && trendRes.message == 'Query Set For Trend Capture') {
                this.saveQueryToast("Analysis for Pin & Trend saved successfully.");
              }
              else if (pinRes.message == 'Query Set For Pinned' && trendRes.message == 'Three Queries Already Marked For Trend Capture') {
                this.saveQueryToast("Analysis for Pin was saved successfully but Can not set trend more than 3");
              }
              else if (pinRes.message == 'Four Queries Already Marked For Pinned' && trendRes.message == 'Query Set For Trend Capture') {
                this.saveQueryToast("Analysis for Trend was saved successfully but Can not set pin more than 4");
              }
              else {
                this.saveQueryToast("Analysis for Pin & Trend not saved.");
              }
            });
          });
        }
        else if (this.isPin) {
          this.http.pinQuery(this.util.getUserId(), this.queryId).subscribe((pinRes: any) => {
            if (pinRes.message == 'Query Set For Pinned') {
              //saved
              this.saveQueryToast('Analysis & Pin saved successfully.');
            }
            else if (pinRes.message == 'Four Queries Already Marked For Pinned') {
              //exceed 4 pin
              this.saveQueryToast('Analysis saved but Can not set pin more than 4');
            }
          });
        }
        else if (this.isTrend){
          this.http.trendQuery(this.util.getUserId(), this.queryId).subscribe((trendRes: any) => {
            if (trendRes.message == 'Query Set For Trend Capture') {
              //saved
              this.saveQueryToast('Analysis & Trend saved successfully.');
            }
            else if (trendRes.message == 'Three Queries Already Marked For Trend Capture') {
              //exceed 4 pin
              this.saveQueryToast('Analysis saved but Can not set trend more than 3');
            }
          });
        }
        
        else{this.saveQueryToast('Analysis saved successfully.');}
        this.matDialog.close({ data: true });
      }
      
    });
  }
  close() {
    this.matDialog.close({ data: false });
  }
  remove(index: any) {
    this.nameOfItem.splice(index, 1);
  }
  onChangePin(pinCheckVal: MatCheckboxChange) {
    this.isPin = pinCheckVal.checked;
  }
  onChangeTrend(trendCheckVal: MatCheckboxChange) {
    this.isTrend = trendCheckVal.checked;
  }
  saveQueryToast(msg: any) {
    this.toastr.success(msg, '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
}

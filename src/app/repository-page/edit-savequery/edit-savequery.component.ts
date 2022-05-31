import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/http.service';
import { UtilService } from 'src/app/shared/util.service';
import { ToastrService } from 'ngx-toastr';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpParams } from '@angular/common/http';
interface repoList {
  id: string;
  name: string;
}
@Component({
  selector: 'app-edit-savequery',
  templateUrl: './edit-savequery.component.html',
  styleUrls: ['./edit-savequery.component.css']
})
export class EditSavequeryComponent implements OnInit {
  fform = new FormGroup({
    title: new FormControl('',),
    org: new FormControl('',),
    day: new FormControl('',),
    label: new FormControl('',),
  });
  nameOfItem: repoList[] = [];
  showRepo: boolean = false;
  isPin: boolean = false;
  isTrend: boolean = false;
  showLabel: boolean = false;
  showDays: boolean = false;
  repoList: any;
  queryDetail: any;
  repoListObject: any;
  pinChecked: boolean = false;
  trendChecked: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpService,
    private util: UtilService,
    private toastr: ToastrService,
    public matDialog: MatDialogRef<EditSavequeryComponent>
  ) { }

  ngOnInit(): void {
    this.fform.get('title').setValue(this.util.getQueryTitle());
    if (this.util.getQueryOrg() != null) {
      this.fform.get('org').setValue(this.util.getQueryOrg());
      this.fform.controls['org'].disable();
    } else {
      this.fform.controls['org'].disable();
      this.fform.get('org').setValue(localStorage.getItem('orgLogin'));
    }

    this.nameOfItem = this.util.getCollectiveRepoData();
    if (this.nameOfItem.length > 0) {
      this.showRepo = true;
    }
    else {
      this.showRepo = false;
    }
    if (this.data.days != null) {
      this.fform.get('day').setValue(this.data.days);
      this.showDays = true;
    }
    else {
      this.showDays = false;
    }
    if (this.util.getIsPinned() == true) {
      this.pinChecked = true;
    }
    else {
      this.pinChecked = false;
    }
    if (this.util.getIsTrendCapture() == true) {
      this.trendChecked = true;
    }
    else {
      this.trendChecked = false;
    }
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
  EditQuery() {
    this.queryDetail = this.data.query;
    let params = new HttpParams()
      .set('userId', this.util.getUserId())
      .set('title', this.fform.value.title)
      .set('queryKey', this.data.queryKey)
      .set('type', this.data.type)
      .set('orgName', localStorage.getItem('orgLogin'));

    if (this.data.days != null) {
      params = params.append('days', this.fform.value.day);
      this.repoList = this.util.getCollectiveRepoData();
      this.repoListObject = { "repoNames": this.repoList };
    }
    if (this.data.label != null) {
      params = params.append("label", this.fform.value.label);
      this.repoList = this.util.getCollectiveRepoData();
      this.repoListObject = { "repoNames": this.repoList };
    }
    this.http.editSaveQuery(this.repoListObject, params, this.data.queryId).subscribe((editQueryResult: any) => {
      if (editQueryResult.message == "Saved Analysis Updated Successfully") {
        this.util.setQueryTitle(this.fform.value.title);
        if (this.isPin != this.util.getIsPinned()) {
          if (this.isPin) {
            this.http.pinQuery(this.util.getUserId(), this.util.getQueryId()).subscribe((pinRes: any) => {
              if (pinRes.message == 'Query Set For Pinned') {
                this.util.setIsPinned(true);
                this.editQueryToast('Saved Analysis & Pin saved successfully.');
              }
              else if (pinRes.message == 'Four Queries Already Marked For Pinned') {
                //exceed 4 pin
                this.editQueryToast('Saved Analysis updated but Can not set pin more than 4');
              }
            });
          }
          else {
            this.http.unsetPinQuery(this.util.getQueryId()).subscribe((unPinRes) => {
              if (unPinRes.message == 'Query Removed from Pinned') {
                this.util.setIsPinned(false);
                this.editQueryToast('Saved Analysis updated & Pinned removed');
              }
            });
          }
        }
        else{
          this.editQueryToast('Saved Analysis Updated Successfully');
        }
        if (this.isTrend != this.util.getIsTrendCapture()) {
          if (this.isTrend) {
            this.http.trendQuery(this.util.getUserId(), this.util.getQueryId()).subscribe((trendRes: any) => {
              if (trendRes.message == 'Query Set For Trend Capture') {
                this.util.setIsTrendCapture(true);
              }
              else if (trendRes.message == 'Three Queries Already Marked For Trend Capture') {
                //exceed 4 pin
                this.editQueryToast('Saved Analysis updated but Can not set trend more than 3');
              }
            });
          } else {
            this.http.unsetTrendQuery(this.util.getQueryId()).subscribe((unTrendRes) => {
              if (unTrendRes.message == 'Query Not Removed from Trend Capture') {
                this.util.setIsTrendCapture(false);
                this.editQueryToast('Analysis updated & Trend removed');
              }
            });
          }
        }

      }
      else{
        this.editQueryToast('Saved Analysis Updated Successfully');
      }
    });
  }
  editQueryToast(msg: any) {
    this.toastr.success(msg, '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
}

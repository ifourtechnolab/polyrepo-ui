import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../shared/http.service';
import { UtilService } from '../../shared/util.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-savequery',
  templateUrl: './savequery.component.html',
  styleUrls: ['./savequery.component.css']
})
export class SavequeryComponent implements OnInit {
  repoList: any;
  repoListObject: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private http: HttpService, 
  private util: UtilService, 
  private toastr: ToastrService,
  public matDialog: MatDialogRef<SavequeryComponent>) { }

  ngOnInit(): void {
  }
  fform = new FormGroup({
    title: new FormControl('',),
  });

  //saveQuery with title
  SaveQuery() {
    let params = new HttpParams()
      .set('userId', this.util.getUserId())
      .set('title', this.fform.value.title)
      .set('queryKey', this.data.queryKey)
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
      debugger
    }
    this.http.saveQueryCall(this.repoListObject, params).subscribe((SaveQueryData: any) => {
      if (SaveQueryData.message == 'Query saved successfully') {
        this.toastr.success('Query saved succefully', '', {
          positionClass: 'toast-top-center',
          closeButton: true,
          easeTime: 250,
        });
        
        this.matDialog.close({ data: true });
      }

    });
  }
  close(){
    this.matDialog.close({ data: false });
  }
}

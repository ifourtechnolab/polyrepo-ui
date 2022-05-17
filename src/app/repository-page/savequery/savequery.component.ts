import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService, private util: UtilService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  fform = new FormGroup({
    title: new FormControl('',),
  });

  //saveQuery with title
  SaveQuery() {
    this.repoList = this.util.getCollectiveRepoData();
    this.repoListObject = { "repoNames": this.repoList };
    let params = new HttpParams()
      .set('userId', localStorage.getItem('id'))
      .set('title', this.fform.value.title)
      .set('queryKey', this.data.queryKey)
      .set('orgName', localStorage.getItem('orgLogin'));
    if (this.data.days != null) {
      params.set('days', this.data.days);
    }
    this.http.SaveQueryCall(this.repoListObject, params).subscribe((SaveQueryData: any) => {
      this.toastr.success('Query saved succefully', '', {
        positionClass: 'toast-top-center',
        closeButton: true,
        easeTime: 250,
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MaterialModuleModule } from '../../shared/material-module/material-module.module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  email: any;
  passWord: any;
  isTokenInput = false;


  constructor(private fb: FormBuilder, private http: HttpService, private toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      token: ['']
    })
  }

  login() {
    if (this.isTokenInput == true && this.loginFormGroup.value.token != null) {
      let data = {
        "bearerToken": this.loginFormGroup.value.token,
        "id": localStorage.getItem('id'),
      }
      this.http.updateToken(data).subscribe((result: any) => {
        if (result.message == "Token updated") {
          localStorage.setItem('token', this.loginFormGroup.value.token);
          this.router.navigate(['/repo']);
        }
      });
    }
    else {
      this.http.login(this.loginFormGroup.value).subscribe((data: any) => {
        if (data.message == "User Found") {
          localStorage.setItem('id', data.id);
          localStorage.setItem('token', data.bearer_token);
          if (data.token_validation == "Invalid Token") {
            this.isTokenInput = true;
            this.error_toast('Expired token , Please enter new token.');
          }
          else {
            this.router.navigate(['/repo']);
          }
        }
        else {
          this.error_toast('Please enter correct credential.');
        }
      });
    }
  }
  error_toast(msg: any) {
    this.toastr.error(msg, '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
}

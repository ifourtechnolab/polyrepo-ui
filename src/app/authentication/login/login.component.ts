import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
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
  email:any;
  passWord:any;


  constructor(private fb: FormBuilder,private http: HttpService,private toastr: ToastrService, public router: Router ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  login(){
    this.http.login(this.loginFormGroup.value).subscribe((data:any)=>{
        if (data.message == "User Found") {
        localStorage.setItem('id',data.id);
        localStorage.setItem('token',data.bearer_token);
        this.router.navigate(['/repo']);
      }
      else {
        this.error_toast();
      }
    });
  }
  error_toast() {
    this.toastr.error('Please enter correct credentials.', '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
}

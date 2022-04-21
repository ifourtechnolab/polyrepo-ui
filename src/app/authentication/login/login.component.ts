import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    this.email=this.loginFormGroup.value.email;
    this.passWord=this.loginFormGroup.value.password;
    this.http.login(this.email,this.passWord).subscribe((data:any)=>{
      console.log(JSON.stringify(data));
      if (data.message == "User Found") {
        //this.success_toast();
        this.router.navigate(['/repository-page']);
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

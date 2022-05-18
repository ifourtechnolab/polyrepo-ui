import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  RegistrationFormGroup: FormGroup;
  email: any;
  passWord: any;
  confirmPassword: any;
  Token: any;
  authToken: any;
  constructor(private fb: FormBuilder, private http: HttpService, private toastr: ToastrService, public router: Router) { }
  ngOnInit(): void {
    this.RegistrationFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
      token: ['', [Validators.required]]
    });
  }
  //visibility for password and confirm password 
  onPasswordValidation() {
    if (this.password.value.match(/\b(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\b/)) {
      this.RegistrationFormGroup.get('confirmpassword').enable();
    }
    else {
      this.RegistrationFormGroup.get('confirmpassword').disable();
    }
  }
  //check validation for password and confirm password
  onPasswordChange() {
    if (this.confirmpassword.value == this.password.value) {
      this.confirmpassword.setErrors(null);
    } else {
      this.confirmpassword.setErrors({ mismatch: true });
    }
  }
  get password() {
    return this.RegistrationFormGroup.get('password');
  }
  get confirmpassword() {
    return this.RegistrationFormGroup.get('confirmpassword');
  }

  //register functionality
  register() {
    let data = {
      "userName": this.RegistrationFormGroup.value.username,
      "bearerToken": this.RegistrationFormGroup.value.token,
      "email": this.RegistrationFormGroup.value.email,
      "password": this.RegistrationFormGroup.value.password,

    }
    this.http.register(data).subscribe((data: any) => {
      if (data.message == "Invalid Token") {
        this.RegistrationFormGroup.get('token').reset();
        this.error_toast('Invalid token');
      }
      else {
        if (data.message == "User was created successfully.") {
          this.success_toast();
          let obj={
            "token":data.bearer_token,
            "id":data.id,
            "username":this.RegistrationFormGroup.value.username,
          }
          localStorage.setItem('user', JSON.stringify(obj));
          this.router.navigate(['/dashboard']);
        }
        else {
          this.error_toast('Email already exist');
        }
      }

    });
  }
  //toast for successful registration
  success_toast() {
    this.toastr.success('Registration successful', '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
  //toast for invalid registration
  error_toast(msg: any) {
    this.toastr.error(msg, '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
}

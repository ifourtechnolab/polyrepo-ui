import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../shared/http.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private fb: FormBuilder, private http: HttpService, private toastr: ToastrService) { }
  ngOnInit(): void {
      this.authToken = localStorage.getItem('token');
      this.RegistrationFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: [{ value: null, disabled: true }, [Validators.required]],
      token: ['', [Validators.required]]
    });
  }
  //visibility for password and confirm password 
  onPasswordValidation() 
  {
    if (this.password.value.match(/\b(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\b/))
    {
      this.RegistrationFormGroup.get('confirmpassword').enable();
    }
    else 
    {
      this.RegistrationFormGroup.get('confirmpassword').disable();
    }
  }
  //check validation for password and confirm password
  onPasswordChange() 
  {
    if (this.confirmpassword.value == this.password.value)
    {
      this.confirmpassword.setErrors(null);
    } else 
    {
      this.confirmpassword.setErrors({ mismatch: true });
    }
  }
  get password() 
  {
    return this.RegistrationFormGroup.get('password');
  }
  get confirmpassword() 
  {
    return this.RegistrationFormGroup.get('confirmpassword');
  }

  //register functionality
  register() {
    this.email = this.RegistrationFormGroup.value.email;
    this.passWord = this.RegistrationFormGroup.value.password;
    this.Token = this.RegistrationFormGroup.value.token;
    this.http.register(this.Token, this.email, this.passWord).subscribe((data: any) => {
      if (data.message == "User was created successfully.") {
        this.success_toast();
      }
      else {
        this.error_toast();
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
  error_toast() {
    this.toastr.error('Email already exist', '', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
  }
}

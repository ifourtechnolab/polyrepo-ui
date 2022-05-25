import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from './util.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthRepoGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService, private util: UtilService) { }
  canActivate()
  {
    // if (this.util.isLoggedIn() && this.util.hasOrgValue()) {
    if (this.util.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
  
}

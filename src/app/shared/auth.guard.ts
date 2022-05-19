import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService, private util: UtilService) { }
  canActivate() {
    if (this.util.isLoggedIn()) {
      return true;
    }

    this.toastr.error('You cannot go there without logged in!', 'Opps!', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime: 250,
    });
    this.router.navigate(['/auth/login']);
    return false;
  }

}

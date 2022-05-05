import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) { }
  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.toastr.error('You cannot go there without logged in!', 'Opps!', {
      positionClass: 'toast-top-center',
      closeButton: true,
      easeTime:250,
    });
    this.router.navigate(['/auth/login']);
    return false;
  }

}

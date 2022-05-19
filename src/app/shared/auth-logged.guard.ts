import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoggedGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService, private util: UtilService) { }
  canActivate(){
    if (!this.util.isLoggedIn()) {
      return true;
    }
    if(this.util.isLoggedIn() && this.util.hasOrgValue()){
      this.router.navigate(['/repo']);
      return false;  
    }
    else{
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
  
}

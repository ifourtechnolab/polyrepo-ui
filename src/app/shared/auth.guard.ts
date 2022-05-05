import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate() {
    if(this.auth.IsLoggedIn())
    {
      return true;
    }
    alert('you cannot go there!!without logged in');
    this.router.navigate(['/auth/login']);
    return false;
  }
  
}

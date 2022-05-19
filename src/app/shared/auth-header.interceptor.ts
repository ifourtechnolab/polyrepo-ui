import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UtilService } from './util.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private util:UtilService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.util.getToken() != null) {
      const clonedReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          this.util.getToken()
        ),
      });
      return next.handle(clonedReq).pipe(
        tap(
          (succ) => {},
          (err) => {
            if (err.status === 401) {
              localStorage.removeItem('user');
            }
          }
        )
      );
    } else { return next.handle(request.clone()); }
  }
}

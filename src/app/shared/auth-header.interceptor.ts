import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') != null) {
      const clonedReq = request.clone({
        headers: request.headers.set(
          'Authorization',
           localStorage.getItem('token')
        ),
      });
      return next.handle(clonedReq).pipe(
        tap(
          (succ) => {},
          (err) => {
            if (err.status === 401) {
              localStorage.removeItem('token');
            }
          }
        )
      );
    } else { return next.handle(request.clone()); }
  }
}

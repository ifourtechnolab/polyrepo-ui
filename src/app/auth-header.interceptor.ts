import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from './shared/util.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private utilService:UtilService ) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.utilService.getToken()
      }
    });
    return next.handle(req);
  }
}

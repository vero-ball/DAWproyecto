import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + loginToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

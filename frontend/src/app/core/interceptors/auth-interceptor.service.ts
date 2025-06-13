import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginToken = localStorage.getItem('loginToken');
    let authReq = req;
    if (loginToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + loginToken)
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('loginToken');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

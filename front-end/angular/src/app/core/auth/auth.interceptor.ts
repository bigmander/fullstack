import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const info = this.auth.getInfo();
    
    if (info !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${info.accessToken}`
        }
      });
    
    }

    return next.handle(req);
  }

  
}

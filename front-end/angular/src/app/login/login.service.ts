import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../core/auth/auth.service';
import { environment } from 'src/environments/environment';
import { LoginResponse, LoginRequest } from './login';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  jwt: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    
  ) { }

  logout(): void {
    this.authService.unAuthenticate();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        const { accessToken } = response;
        const decode = this.jwt.decodeToken(accessToken);

        this.authService.authenticate({
          accessToken,
          expiresAt: decode.exp * 1000,
          user: credentials.email.replace('@fakemail.com', '')
        });
      })
    );
  }
}

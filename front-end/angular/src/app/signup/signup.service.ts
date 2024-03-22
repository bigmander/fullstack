import { Injectable } from '@angular/core';
import { SignupRequest } from './signup-request';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) {

  }

  signup(cred: SignupRequest) {
    return this.http.post(`${environment.apiUrl}/signup`, cred)

  }
}

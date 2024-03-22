import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        'test@test.com', 
        // 'test2@example.com', 
        // 'user@example.com', 
        Validators.compose([Validators.required, Validators.email])
      ],
      password: ['best_Passw0rd', Validators.compose([Validators.required])]
    })
  }

  login(credentials: LoginRequest): void {
    this.loginService.login(credentials).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

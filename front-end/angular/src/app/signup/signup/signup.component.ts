import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../signup-request';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  sucessfullySignedUp = false;

  validateConfirmPassword: ValidatorFn = (control) => {
    if (!control) return null;

    return control.get('password').value === control.get('confirmPassword').value ? null : {
      confirmPassword: true
    };
  };

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        'test@test.com',
        // 'test2@example.com', 
        // 'user@example.com', 
        Validators.compose([Validators.required, Validators.email])
      ],
      password: ['best_Passw0rd', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[A-Za-z]{1,}/),
        Validators.pattern(/[^A-Za-z0-9]{1,}/)
      ])],
      confirmPassword: ['best_Passw0rd', Validators.compose([Validators.required])],

    }, {
      validators: [
        this.validateConfirmPassword
      ]
    })
  }

  signup(credentials: SignupRequest): void {
    this.signupService.signup(credentials).subscribe(() => {
      this.snackBar.open(`User signed up`, 'Close', {
        duration: 2000
      });
      this.sucessfullySignedUp = true;
    }, (e) => {
      this.snackBar.open(`User cannot be signed up, please review your form`, 'Close', {
        duration: 2000
      });
    });
  }
}

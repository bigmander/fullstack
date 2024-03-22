import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SignupComponent } from './signup/signup.component';
import { MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SignupSuccessfulComponent } from './signup-successful/signup-successful.component';

@NgModule({
  declarations: [
    SignupComponent,
    SignupSuccessfulComponent
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    RouterModule
  ]
})
export class SignupModule { }

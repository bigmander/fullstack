import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  handleError(args: any): void {
    if (args instanceof HttpErrorResponse) {
      const { message, error } = args;
      this.snackBar.open(`${error}: ${message}`, 'Close', {
        duration: 200
      });
    }
    else {
      console.error(args);
    }
  }
}

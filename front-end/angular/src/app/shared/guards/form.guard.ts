import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

export interface LeaveForm {
  canLeave(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<LeaveForm> {

  constructor(
    public dialog: MatDialog
  ) {

  }

  confirmLeave(): Observable<boolean> {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Leave Form',
        description: 'Are you sure you want to leave with unsaved changes?'
      }
    });

    return dialogRef.afterClosed();
  }

  canDeactivate(component: LeaveForm): boolean | Observable<boolean> {
    if (!component.canLeave()) {
      return this.confirmLeave();
    }
    return true;
  }

}
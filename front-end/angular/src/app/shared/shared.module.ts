import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LeaveDirective } from './directives/leave.directive';
import { MatButtonModule } from '@angular/material/button';
import { AvatarComponent } from './avatar/avatar.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';


@NgModule({
  declarations: [AvatarComponent, TimeAgoPipe, ConfirmDialogComponent, LeaveDirective],
  imports: [
    CommonModule,
    MatDialogModule,

    MatButtonModule
  ],
  exports: [ConfirmDialogComponent, AvatarComponent,TimeAgoPipe, LeaveDirective],
  entryComponents: [ConfirmDialogComponent]
}) 
export class SharedModule { }

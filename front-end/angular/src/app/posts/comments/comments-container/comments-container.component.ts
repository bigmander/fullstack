import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { filter, flatMap } from 'rxjs/operators';
import { CommentsService } from '../comments.service';
import { Comment } from '../comment';
import { Post } from '../../post';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.sass']
})
export class CommentsContainerComponent {
  constructor(
    private dialog: MatDialog,
    private commentsService: CommentsService,

  ) { }

  @Input() comments: Comment[] = [];
  @Input() post: Post = null;

  deleteComment(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete a Comment',
        description: 'Do you want to delete this comment?'
      }
    });

    dialogRef.afterClosed().pipe(
      filter((isOk) => !!isOk),
      flatMap(() => this.commentsService.delete(id))
    ).subscribe(() => {
      window.location.href = '/';
    });
  }
}

import { Component, Input } from '@angular/core';
import { Post } from '../post';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { PostsService } from '../posts.service';
import { filter, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent {
  constructor(
    private dialog: MatDialog,
    private postsService: PostsService,

  ) { }

  @Input() post: Post = null;

  

  deletePost(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete a Post',
        description: 'Do you want to delete this post?'
      }
    });

    dialogRef.afterClosed().pipe(
      filter((isOk) => !!isOk),
      flatMap(() => this.postsService.delete(id))
    ).subscribe(() => {
      window.location.href = '/';
    });
  }}

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { filter, flatMap, take } from 'rxjs/operators';
import { CommentsService } from '../comments.service';
import { Comment, CommentForm } from '../comment';
import { LeaveForm } from 'src/app/shared/guards/form.guard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.sass']
})
export class CommentCreateComponent implements LeaveForm {
  canLeave(): boolean {
    return !this.form.dirty;
  }

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();

  }

  buildForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  submit() {
    const formValues: CommentForm = this.form.value;
    this.commentsService.create({
      ...formValues,
      postId: this.route.snapshot.params.id
    } as Comment)
      .pipe(
        take(1)
      )
      .subscribe(() => {

        this.form.reset(formValues);
        this.router.navigate(['/posts'])
      }, () => {
        this.form.reset(formValues);
      });
  }

}

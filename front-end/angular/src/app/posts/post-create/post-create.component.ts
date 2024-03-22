import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { LeaveForm } from 'src/app/shared/guards/form.guard';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post } from '../post';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass'],

})
export class PostCreateComponent implements LeaveForm {
  @ViewChild(PostFormComponent, { static: false }) form: PostFormComponent;

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  canLeave(): boolean {
    return this.form.canLeave;
  }

  onSubmit($formValues: Post): void {
    this.postsService.create($formValues)
      .pipe(
        take(1)
      )
      .subscribe(() => {

        this.router.navigate(['/posts'])
      }, () => {
        this.form.reset($formValues);
      });
  }

}

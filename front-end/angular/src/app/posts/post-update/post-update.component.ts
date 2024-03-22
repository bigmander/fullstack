import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { LeaveForm } from 'src/app/shared/guards/form.guard';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.sass'],
})
export class PostUpdateComponent implements LeaveForm {
  get post() {
    return this.route.snapshot.data.post;
  }

  @ViewChild(PostFormComponent, { static: false }) form: PostFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) { }

  canLeave(): boolean {
    if (!this.form) return true;

    return this.form.canLeave;
  }

  onSubmit($formValues): void {
    console.log($formValues);

    this.postsService.update(this.route.snapshot.params.id, {
      ...$formValues,
      id: this.route.snapshot.params.id
    }).subscribe(() => {
      this.router.navigate(['/posts'])
    }, () => {
      this.form.reset($formValues);
    });
  }

}

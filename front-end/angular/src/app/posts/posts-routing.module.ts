import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { PostsResolver } from './posts.resolver';
import { FormGuard } from '../shared/guards/form.guard';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';


const routes: Routes = [{
  path: '',
  component: PostsContainerComponent,
  children: [{
    path: ':id/update',
    component: PostUpdateComponent,
    canActivate: [AuthGuard],
    resolve: {
      post: PostsResolver
    },
    canDeactivate: [FormGuard]
  },
  {
    path: ':id/add-comment',
    component: CommentCreateComponent,
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard]
  }, {
    path: ':id/update',
    component: PostUpdateComponent,
    canActivate: [AuthGuard],
    resolve: {
      post: PostsResolver
    },
    canDeactivate: [FormGuard]
  }, {
    path: 'create',
    component: PostCreateComponent,
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard]
  }, {
    path: '',
    component: PostsListComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }

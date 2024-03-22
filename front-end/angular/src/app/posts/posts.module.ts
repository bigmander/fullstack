import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../core/auth/auth.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';
import { CommentsModule } from './comments/comments.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    PostsListComponent,
    PostComponent,
    CommentCreateComponent,
    PostFormComponent,
    PostCreateComponent,
    PostUpdateComponent,
    PostsContainerComponent
  ],
  imports: [
    MatDividerModule,
    MatToolbarModule,
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule,
    CommentsModule
  ],
  exports: [PostCreateComponent, PostUpdateComponent]
})
export class PostsModule { }

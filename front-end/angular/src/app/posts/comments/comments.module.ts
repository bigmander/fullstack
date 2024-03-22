import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsContainerComponent } from './comments-container/comments-container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { AuthModule } from 'src/app/core/auth/auth.module';


@NgModule({
  declarations: [
    CommentsContainerComponent
  ],
  imports: [
    AuthModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    SharedModule,
    MatButtonModule,
    RouterModule,
    MatExpansionModule,
    MatListModule
  ],
  exports: [CommentsContainerComponent]
})
export class CommentsModule { }

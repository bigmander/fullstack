import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostsService } from './posts.service';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<Post> {

  constructor(
    private postsService: PostsService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    return this.postsService.getPost(route.params['id'])
      .pipe(
        catchError(() => of(null))
      )
  }
}

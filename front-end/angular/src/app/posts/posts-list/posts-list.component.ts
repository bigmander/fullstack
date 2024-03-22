import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.sass']
})
export class PostsListComponent implements OnInit {

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) { }

  posts$: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = this.route.queryParams.pipe(
      flatMap((p: Params) => this.postsService.getPosts(p.q))
    )
  }

  

  goTop() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-post-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.sass']
})
export class PostsContainerComponent {

  constructor(
    private auth: AuthService
  ) { }

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

}

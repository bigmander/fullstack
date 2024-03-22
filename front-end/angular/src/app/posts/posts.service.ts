import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from './post';
import { Observable } from 'rxjs';
import { Comment } from './comments/comment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(query: string = ''): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts?_embed=comments&_sort=createdAt&_order=desc`, {
      params: {
        q: query
      }
    });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`);
  }

  create(data: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}/posts/`, {
      ...data,
      createdAt: new Date().toISOString(),
      lastModification: null
    });
  }


  delete(id: string): Observable<Post> {
    return this.http.delete<Post>(`${environment.apiUrl}/posts/${id}`);
  }

  update(id: number, data: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.apiUrl}/posts/${id}`, {
      ...data,
      lastModification: new Date().toISOString()
    });
  }
}

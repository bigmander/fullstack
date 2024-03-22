import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comment } from './comment';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(
        private http: HttpClient
    ) { }


    create(data: Comment): Observable<Comment> {
        return this.http.post<Comment>(`${environment.apiUrl}/posts/${data.postId}/comments`, {
            ...data,
            createdAt: new Date().toISOString(),
            lastModification: null
        });
    }

    delete(id: string): Observable<Comment> {
        return this.http.delete<Comment>(`${environment.apiUrl}/comments/${id}`);
    }


}

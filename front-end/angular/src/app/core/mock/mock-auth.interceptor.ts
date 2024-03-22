import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MockAuthInterceptor implements HttpInterceptor {
    jwt: JwtHelperService = new JwtHelperService();

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = req.headers.get('Authorization');

        if (!token) {
            return next.handle(req);
        }

        const decoded = this.jwt.decodeToken(token.replace('Bearer ', ''));

        if (req.method === 'POST')
            req = req.clone({
                body: {
                    ...req.body,
                    author: decoded.email,
                    userId: decoded.id
                }
            });

        return next.handle(req)
            .pipe(
                map(event => {
                    if (event instanceof HttpResponse) {
                        if (req.url.includes('posts?') && req.method === 'GET') {
                            const clonedbody = event.body.map(b => 
                                ({ 
                                    ...b, 
                                    comments: b.comments.map(
                                        c => 
                                        ({ 
                                            ...c, 
                                            canDelete: c.author === decoded.email || b.author === decoded.email
                                         })
                                    ), 
                                    canManage: b.author === decoded.email 
                                })
                            );

                            return event.clone({ body: clonedbody });
                        }
                    }
                    return event;
                })
            );
    }
}

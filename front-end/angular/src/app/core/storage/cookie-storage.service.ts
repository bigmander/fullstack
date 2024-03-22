import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JWTInfo } from './storage.interface';


@Injectable({
  providedIn: 'root'
})
export class CookieStorageService implements StorageService {
  
  save({ accessToken, expiresAt, user }: JWTInfo): void {
    const expiredDate = (new Date(expiresAt).toUTCString());

    document.cookie = `user=${JSON.stringify({ user, accessToken })};expires=${expiredDate};path=/;`
  }

  get(): JWTInfo {
    let info = null;

    try {
      [, info] = document.cookie.match(/user=(.+)/);

      info = JSON.parse(info);
    }
    finally {
      return info;
    }
  }

  exists(): boolean {
    return document.cookie.includes('user');
  }

  destroy(): void {
    document.cookie = `user=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JWTInfo } from './storage.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageService {
  save(jwt: JWTInfo): void {
    const expiredDate = (new Date(jwt.expiresAt).toUTCString());
    localStorage.setItem('user', JSON.stringify({ user: jwt.user, accessToken: jwt.accessToken, expiresAt: expiredDate }));
  }

  get(): JWTInfo {
    let info = null;

    info = JSON.parse(localStorage.getItem('user'));

    if (info !== null) {
      if (this._hasExpired(info)) {
        this.destroy();
        return null;
      }
    }

    return info;
  }

  private _hasExpired({ expiresAt }) {

    const expiredDate = new Date(expiresAt).getTime();

    return expiredDate < Date.now();
  }

  exists(): boolean {
    const info = this.get();

    return info !== null;
  }

  destroy(): void {
    localStorage.removeItem('user');
  }
}

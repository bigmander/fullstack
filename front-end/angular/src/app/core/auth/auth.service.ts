import { Injectable, Inject } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { JWTInfo } from '../storage/storage.interface';
import { STORAGE_SERVICE } from '../storage/storage.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(STORAGE_SERVICE) private storage: StorageService
  ) {
    
  }

  isAuthenticated(): boolean {
    return this.storage.exists();
  }

  authenticate(args: JWTInfo) {
    this.storage.save(args);
  }

  getInfo() {
    return this.storage.get()
  }

  unAuthenticate() {
    this.storage.destroy();
  }
}

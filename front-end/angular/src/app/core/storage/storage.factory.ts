import { StorageType } from './storage.enum';
import { LocalStorageService } from './local-storage.service';
import { CookieStorageService } from './cookie-storage.service';

export function storageFactory(storage: StorageType = StorageType.CookieStorage) {
    return function () {
      switch (storage) {
        case StorageType.LocalStorage: return new LocalStorageService();
      }
      return new CookieStorageService();
    }
  }
  
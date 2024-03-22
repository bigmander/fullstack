import { InjectionToken } from '@angular/core';
import { StorageService } from './storage.service';

export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');
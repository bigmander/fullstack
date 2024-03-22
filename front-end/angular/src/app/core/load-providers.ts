import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { STORAGE_SERVICE } from './storage/storage.token';
import { storageFactory } from './storage/storage.factory';
import { MockAuthInterceptor } from './mock/mock-auth.interceptor';
import { environment } from 'src/environments/environment';

export const loadProviders = () => {
  let providers = [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
    {
      provide: STORAGE_SERVICE, useFactory: storageFactory()
    }
  ];
  if (environment.stage === 'mock') {
    return [
      ...providers,
      { provide: HTTP_INTERCEPTORS, multi: true, useClass: MockAuthInterceptor }
    ];
  }
  return providers;
};

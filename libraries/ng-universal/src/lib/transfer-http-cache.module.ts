import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TransferHttpCacheInterceptor } from './interceptors/http-transfer-cache.interceptor';
import { TransferStateOptions } from './interceptors/transfer-state-options.interface';
import { TRANSFER_STATE_CACHE_OPTIONS } from './interceptors/http-transfer.tokens';

/**
* An NgModule used in conjunction with `ServerTransferHttpCacheModule` to transfer cached HTTP
* calls from the server to the client application.
* Useage:
*
export function cacheFilter(req, key) {
  // determine what req.url's can pass through (or let all POST requests go through)
  return true;
}

imports: [
  ServerTransferHttpCacheModule, // from platform-server
  TransferHttpCacheModule.forRoot({
    cachePOSTFilter: cacheFilter
  })
]
*/
@NgModule({
  imports: [BrowserTransferStateModule]
})
export class TransferHttpCacheModule {
  static forRoot(options: TransferStateOptions): ModuleWithProviders {
      return {
          ngModule: TransferHttpCacheModule,
          providers: [
              TransferHttpCacheInterceptor,
              { provide: TRANSFER_STATE_CACHE_OPTIONS, useValue: options ? options : {} },
              { provide: HTTP_INTERCEPTORS, useExisting: TransferHttpCacheInterceptor, multi: true },
          ],
      };
  }
}

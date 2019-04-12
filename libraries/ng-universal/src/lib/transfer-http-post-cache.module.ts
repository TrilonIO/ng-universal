import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpPostCacheInterceptor } from './services/transfer-http-post-cache-interceptor';

@NgModule({
  imports: [
    BrowserTransferStateModule
  ],
  providers: [
    TransferHttpPostCacheInterceptor
  ]
})
export class TransferHttpPostCacheModule { }



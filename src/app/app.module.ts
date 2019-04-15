import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgUniversalModule, TransferHttpCacheModule } from '../../libraries/ng-universal/src/public-api';
// import { NgUniversalModule, TransferHttpCacheModule } from '@trilon/ng-universal';
import { HttpClientModule } from '@angular/common/http';

// Cache only -Specific- POST requests
export function cachePostFilter(req, key) {
  const cacheList = ['/posts'];
  const cache = cacheList.filter(p => {
    if (req.url.includes(p)) {
      return true;
    }
    return false;
  }).length >= 0;

  console.log(req.method);
  console.log(req.url);
  console.log(key);
  return cache;
}

// Cache all but a DENY list
// export function cachePostFilter(req, key) {
//   const deniedPosts = ['/posts', 'exception/client', 'test/api', 'auth'];
//   const cache = deniedPosts.filter(p => {
//     if (req.url.includes(p)) {
//       return false;
//     }
//     return true;
//   }).length <= 0;
//   return cache;
// }
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgUniversalModule,
    TransferHttpCacheModule.forRoot({
      cachePOSTFilter: cachePostFilter
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

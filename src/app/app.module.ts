import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgUniversalModule, TransferHttpCacheModule } from '../../libraries/ng-universal/src/public-api';
import { HttpClientModule } from '@angular/common/http';

export function cachePostFilter (req, key) {
  console.log('inside cachePOSTFilter');
  console.log(req.method, req.url);
  console.log(req.url);
  console.log(key);
  return true;
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgUniversalModule,
    HttpClientModule,
    TransferHttpCacheModule.forRoot({
      cachePOSTFilter: cachePostFilter
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

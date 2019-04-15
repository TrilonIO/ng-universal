import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { ApplicationRef, Injectable, NgModule, InjectionToken, Inject, ModuleWithProviders } from '@angular/core';
import { BrowserTransferStateModule, TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { Observable, of as observableOf } from 'rxjs';
import { tap, take, filter } from 'rxjs/operators';

import { TRANSFER_STATE_CACHE_OPTIONS } from './http-transfer.tokens';
import { TransferStateOptions } from './transfer-state-options.interface';
import { TransferHttpResponse } from './http-transfer-response.interface';

function getHeadersMap(headers: HttpHeaders) {
  const headersMap: { [name: string]: string[] } = {};
  for (const key of headers.keys()) {
    headersMap[key] = headers.getAll(key)!;
  }
  return headersMap;
}

@Injectable()
export class TransferHttpCacheInterceptor implements HttpInterceptor {

  private isCacheActive = true;
  private hashSeparator = '::';

  constructor(
    appRef: ApplicationRef,
    private transferState: TransferState,
    @Inject(TRANSFER_STATE_CACHE_OPTIONS) private options: TransferStateOptions
  ) {
    // Stop using the cache if the application has stabilized, indicating initial rendering is
    // complete.
    appRef.isStable
      .pipe(
        filter((isStable: boolean) => isStable),
        take(1)
      ).toPromise()
      .then(() => {
        this.isCacheActive = false;
      });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const storeKey: StateKey<TransferHttpResponse> = makeStateKey<TransferHttpResponse>(this.constructCacheKey(req));

    // Stop using the cache if there is a mutating call.
    if (!this.isAllowedRequestMethod(req)) {
      this.isCacheActive = false;
      this.invalidateCacheEntry(storeKey);
    }

    if (!this.isCacheActive && !this.transferState.hasKey(storeKey) || !this.isPostRequestAllowed(req, storeKey)) {
      // Cache is no longer active. Pass the request through.
      return next.handle(req);
    }

    if (this.transferState.hasKey(storeKey)) {
      // Request found in cache. Respond using it.
      const response = this.transferState.get(storeKey, {} as TransferHttpResponse);
      this.invalidateCacheEntry(storeKey);
      return observableOf(new HttpResponse<any>({
        body: response.body,
        headers: new HttpHeaders(response.headers),
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      }));
    } else {
      // Request not found in cache. Make the request and cache it.
      const httpEvent = next.handle(req);
      return httpEvent
        .pipe(
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.transferState.set(storeKey, {
                body: event.body,
                headers: getHeadersMap(event.headers),
                status: event.status,
                statusText: event.statusText,
                // tslint:disable-next-line:no-non-null-assertion
                url: event.url!,
              });
            }
          })
        );
    }
  }

  private isAllowedRequestMethod(req: HttpRequest<any>) {
    return req.method === 'GET' || req.method === 'HEAD' || req.method === 'POST';
  }

  private isPostRequestAllowed(req: HttpRequest<any>, storeKey: string) {
    return req.method === 'POST' && this.options.cachePOSTFilter && this.options.cachePOSTFilter(req, storeKey);
  }

  private invalidateCacheEntry(key: StateKey<TransferHttpResponse>) {
    if (this.transferState.hasKey(key)) {
      this.transferState.remove(key);
    }
  }

  public constructCacheKey(req: HttpRequest<any>) {
    let key = `${req.method[0]}.${req.url}`;
    key = this.options.cacheKeyTransformer
      ? this.options.cacheKeyTransformer(key)
      : key;

    // key = key.substr(0, 2) + key.substr(2).replace(/[^\w\s]/gi, '_');

    if (req.method === 'POST') {
      key += this.hashSeparator + this.hashParams(req.body);
    }

    if (req.method === 'GET') {
      // const hashedParams = req.params.keys().map((param: string) => {
      //   return { key: req.params.get(param) };
      // });
      const encodedParams = req.params.keys().sort().map(k => `${k}=${req.params.get(k)}`).join('&');

      // const key = (method === 'GET' ? 'G.' : 'H.') + url + '?' + encodedParams;

      key += this.hashSeparator + encodedParams;
    }

    return key;
  }

  private hashParams(body: any) {
    let hash = 0;
    const value = JSON.stringify(body);
    if (value.length === 0) {
      return hash;
    }

    for (let i = 0; i < value.length; i++) {
      const char = value.charCodeAt(i);
      // tslint:disable-next-line:no-bitwise
      hash = ((hash << 5) - hash) + char;
      // tslint:disable-next-line:no-bitwise
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }
}
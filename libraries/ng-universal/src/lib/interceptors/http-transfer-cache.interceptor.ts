import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpParams
} from '@angular/common/http';
import { ApplicationRef, Injectable, Inject } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
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
  // private hashSeparator = '::';

  private invalidateCacheEntry(url: string) {
    Object.keys(this.transferState['store'])
      .forEach(key => key.includes(url) ? this.transferState.remove(makeStateKey(key)) : null);
  }

  private makeCacheKey(method: string, url: string, params: HttpParams): StateKey<string> {
    // make the params encoded same as a url so it's easy to identify
    const encodedParams = params.keys().sort().map(k => `${k}=${params.get(k)}`).join('&');
    const key = method[0] + url + '?' + encodedParams;
    return makeStateKey<TransferHttpResponse>(key);
  }

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

    const storeKey = this.makeCacheKey(req.method, req.url, req.params);

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
    if (req.method !== 'POST') {
      return true;
    }
    return req.method === 'POST' && this.options.cachePOSTFilter && this.options.cachePOSTFilter(req, storeKey);
  }

  // public constructCacheKey(req: HttpRequest<any>) {
  //   let key = `${req.method[0]}.${req.url}`;
  //   key = this.options.cacheKeyTransformer
  //     ? this.options.cacheKeyTransformer(key)
  //     : key;

  //   if (req.method === 'POST') {
  //     key += this.hashSeparator + this.hashParams(req.body);
  //   }

  //   if (req.method === 'GET') {
  //     const encodedParams = req.params.keys().sort().map(k => `${k}=${req.params.get(k)}`).join('&');
  //     key += this.hashSeparator + encodedParams;
  //   }

  //   return key;
  // }

  // private hashParams(body: any) {
  //   let hash = 0;
  //   const value = JSON.stringify(body);
  //   if (value.length === 0) {
  //     return hash;
  //   }

  //   for (let i = 0; i < value.length; i++) {
  //     const char = value.charCodeAt(i);
  //     // tslint:disable-next-line:no-bitwise
  //     hash = ((hash << 5) - hash) + char;
  //     // tslint:disable-next-line:no-bitwise
  //     hash = hash & hash; // Convert to 32bit integer
  //   }
  //   return hash.toString();
  // }
}

import { Inject, Injectable, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { WindowService } from './window.service';
import { NgUniversalConfig } from '../ng-universal.config';

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private config: NgUniversalConfig;

  constructor(
    @Optional() optionalConfig: NgUniversalConfig,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private doc: Document,
    private windowService: WindowService,
    private transferState: TransferState,
  ) {
    this.config = optionalConfig;

    if (this.isBrowser) {
      this.windowService.firstSSRRender = true;

      setTimeout(() => {
        this.windowService.firstSSRRender = false;
      }, 4000);
    }
  }

  public get document() {
    return this.doc;
  }

  public get connection() {
    // tslint:disable-next-line: no-string-literal
    if (typeof navigator !== undefined && navigator['connection']) {
      return null;
    }
    // tslint:disable-next-line: no-string-literal
    return navigator['connection'];
  }

  public get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public get isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  // Automatically remove from Cache
  public doNotCache(url: string, requestMethod: 'GET' | 'POST' = 'GET') {
    if (this.isBrowser) {
      this.transferState.remove(makeStateKey((requestMethod === 'GET' ? 'G.' : 'P.') + url));
    }
  }

  public get isFirstRenderAfterSSR() {
    return this.isBrowser && this.windowService.firstSSRRender;
  }

  public get isFirstNavigationAfterSSR() {
    return this.isBrowser && this.windowService.firstSSRNavigation;
  }

  // Safe way to scroll that shuts off html's 100% height (which disables our ability to scroll)
  public scrollTo(x: number, y: number) {
    if (this.isBrowser) {
      this.document.querySelector('html').style.height = 'auto';
      this.windowService.scrollTo(0, 0);
      this.windowService.setTimeout(() => {
        this.document.querySelector('html').style.height = '100%';
      }, 250);
    }
  }
}

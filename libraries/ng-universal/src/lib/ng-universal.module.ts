import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';

import { IsBrowserDirective } from './directives/is-browser.directive';
import { IsServerDirective } from './directives/is-server.directive';
import { PlatformService } from './services/platform.service';
import { WindowService } from './services/window.service';
import { NgUniversalConfig } from './ng-universal.config';
import { SeoService } from './services/seo.service';
import { LinkService } from './services/link.service';

@NgModule({
  declarations: [
    IsBrowserDirective,
    IsServerDirective,
  ],
  imports: [
    BrowserTransferStateModule
  ],
  exports: [
    IsBrowserDirective,
    IsServerDirective,
  ],
  providers: [
    PlatformService,
    SeoService,
    WindowService,
    LinkService
  ]
})
export class NgUniversalModule {
  // static forRoot(config?: NgUniversalModule): ModuleWithProviders {
  //   return {
  //     ngModule: NgUniversalModule,
  //     providers: [
  //       { provide: NgUniversalConfig, useValue: config }
  //     ]
  //   };
  // }
}

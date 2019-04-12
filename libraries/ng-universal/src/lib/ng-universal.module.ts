import { NgModule, ModuleWithProviders } from '@angular/core';
import { IsBrowserDirective } from './directives/is-browser.directive';
import { IsServerDirective } from './directives/is-server.directive';
import { PlatformService } from './services/platform.service';
import { WindowService } from './services/window.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { NgUniversalConfig } from './ng-universal.config';

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
    WindowService
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

import { NgModule } from '@angular/core';
import { IsBrowserDirective } from './directives/is-browser.directive';
import { IsServerDirective } from './directives/is-server.directive';
import { PlatformService } from './services/platform.service';
import { WindowService } from './services/window.service';

@NgModule({
  declarations: [
    IsBrowserDirective,
    IsServerDirective,

  ],
  imports: [

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
  constructor() {
    console.log(`\n\n--- NgUniversalModule Loaded ---\n\n`);
  }
}

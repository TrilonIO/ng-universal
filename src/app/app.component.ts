import { Component } from '@angular/core';
import { PlatformService, WindowService } from '../../libraries/ng-universal/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '@trilon/ng-universal-demo';

  constructor(
    private platform: PlatformService,
    private windowService: WindowService
  ) {
    console.log(`\n\nTest PlatformService: `);
    console.log(`isBrowser: ${this.platform.isBrowser}`);
    console.log(`isServer: ${this.platform.isServer}`);
    console.log(`************************\n\n`);

    // this.platform.isFirstRenderAfterSSR

    const windowInstance = windowService as any;

    console.log(`\n\nTest First Render {window}:`);
    console.log(windowInstance.firstSSRRender);

    if (this.platform.isBrowser) {
      setTimeout(() => {
        console.log('Test First Render after 5001 ms');
        console.log(windowInstance.firstSSRRender);
      }, 5001);
    }
  }
}

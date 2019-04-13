import { Component } from '@angular/core';
import { PlatformService, WindowService } from '../../libraries/ng-universal/src/public-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '@trilon/ng-universal-demo';
  postResponse = {};

  constructor(
    private platform: PlatformService,
    private windowService: WindowService,
    private http: HttpClient
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

    this.demoHttpPost();
  }

  demoHttpPost() {
    this.http.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    }).subscribe(response => {
      console.log(response);
      this.postResponse = response;
    });
  }
}

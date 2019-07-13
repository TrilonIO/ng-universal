import { Component, AfterViewInit, Inject } from '@angular/core';
import { PlatformService, WindowService } from '../../libraries/ng-universal/src/public-api';
// import { PlatformService, WindowService } from '@trilon/ng-universal';
import { HttpClient } from '@angular/common/http';
import { SeoService } from '../../libraries/ng-universal/src/lib/services/seo.service';
import { SeoModel, SeoConfig } from '../../libraries/ng-universal/src/lib/services/seo.interface';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = '@trilon/ng-universal-demo';
  postResponse = {};
  getResponse = [];

  constructor(
    private platform: PlatformService,
    private windowService: WindowService,
    private http: HttpClient,
    private seo: SeoService
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
    this.demoHttpGet();

    this.demoSEOService();

  }

  ngAfterViewInit() {
    // if (this.platform.isBrowser) {
      this.requestAnimationFrameTest();
    // }
  }

  demoHttpGet() {
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((response: []) => {
      console.log('GET response');
      // console.log(response);
      this.getResponse = response;
    });
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

  demoSEOService() {
    console.log('SEOService Demo!');
    console.log(this.seo);

    const config: SeoConfig = {
      title: 'Trilon Ng-Universal Demo',
      description: 'SEO - Description',
      locale: 'en_US',
      url: 'https://trilon.io',
      type: 'website',
      og: {
        site_name: 'Trilon Consulting',
        summary_card: 'summary_large_image'
      },
      keywords: 'trilon, nestjs consulting, nestjs courses, node consulting, angular consulting',
      article: {
        tags: ['seo', 'trilon', 'universal'],
        section: 'trilon'
      },
    };

    this.seo.generateTags(config);

    // const seo: SeoModel = {
    //   title: config.title,
    //   meta: [
    //     { property: 'keywords', content: config.keywords },

    //     { property: 'og:url', content: config.url },
    //     { property: 'og:locale', content: config.locale },
    //     { property: 'og:type', content: config.type },
    //     { property: 'og:site_name', content: config.og.site_name },
    //     { property: 'twitter:card', content: config.og.summary_card },

    //     ...(config.article && config.article.tags
    //       ? [ ...config.article.tags.map(tag => ({ name: 'article:tag', content: `${tag}`}) )]
    //       : []),

    //     ...(config.article && config.article.section
    //      ? [{ property: 'article:section', content: config.article.section }]
    //      : []),

    //     // Title
    //     { property: 'og:title', content: `${config.title}` },
    //     { property: 'twitter:title', content: `${config.title}` },
    //     { property: 'twitter:image:alt', content: config.title
    //     },

    //     // Description
    //     { name: 'description', content: config.description },
    //     { property: 'og:description', content: config.description },
    //     { property: 'twitter:description', content: config.description },
    //   ],
    //   link: [
    //     { target: 'LinkService - target test', charset: 'LinkService - charset' },
    //     { lang: 'LinkService - target test', charset: 'en_US' }
    //   ],
    // };

    // this.seo.updateMeta(seo);

    // this.seo.createBaseMeta();
  }

  requestAnimationFrameTest() {

    let start = null;
    const element = document.getElementById('animation-test');

    function step(timestamp: number) {
      if (!start) { start = timestamp; }
      const progress = timestamp - start;
      element.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
      if (progress < 2000) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }
}

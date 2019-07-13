# Angular Universal Schematics & Utility Helpers - Trilon

[![npm](https://img.shields.io/npm/v/@trilon/ng-universal.svg?label=npm%20version&color=5b1096&style=for-the-badge)](https://www.npmjs.com/@trilon/ng-universal)
[![NPM Downloads](https://img.shields.io/npm/dt/@trilon/ng-universal.svg?color=b31ae7&style=for-the-badge)](https://www.npmjs.com/@trilon/ng-universal)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=e51384)](/LICENSE) 

---

<p align="center">
  <a href="https://trilon.io" target="_blank">
        <img width="500" height="auto" src="https://trilon.io/trilon-logo-clear.png" alt="Trilon.io - Angular Universal, NestJS, JavaScript Application Consulting Development and Training">
  </a>
</p>


<h3 align="center"> Made with :heart: by <a href="https://trilon.io">Trilon.io</a></h3>

---

## Installation

Install & save the library to your package.json:

```bash
$ npm i -S @trilon/ng-universal
```

## Modules Available

- [NgUniversalModule](#nguniversalmodule-setup)
  - [Helpers / Utilities](#angular-universal-helpers)
    - SEO (Meta & Link) Generator / Helper
    - PlatformService 
  - [createWindowMocks](#createwindowmocks)
- [TransferHttpCacheModule](#transferhttpcachemodule-setup)

---

## NgUniversalModule Setup

Now add ApplicationInsightsModule to your Angular Root `AppModule`:

```typescript
// Import the Application Insights module and the service provider
import { NgUniversalModule } from '@trilon/ng-universal';

@NgModule({
  imports: [
    // ...
    // Add the Module to your imports
    NgUniversalModule
  ]
})
export class AppModule { }
```

# Angular Universal Helpers 

Now that the Library is setup, you have a few great helpers to make Angular Universal a bit simpler and easier to work with!

## Angular SEO - Meta & Link Generator

Handling Angular SEO and dynamic Meta & Link generation can be quite the task! Introducing easy-to-use helpers that allow you create a BASE Meta setup for your Application, and easily update the portions needed when visiting different pages/sections of your Application.

#### Setup a Base SEO Configuration

At the Root of your application utilize the `SeoService` to initialize a base setup for your Meta/Link/SEO needs. This way you will only have to update _fragments_ of your Meta at different Routes/Components when needed, while this base structure will always be present. 

> Note: You can also reinitialize this at any part of your Application if you need a fundamentally different Base SEO setup. (ie: /blog/ sections for example, that will always need author|article setup)

```ts
import { SeoService } from '@trilon/ng-universal';

@Component({
  selector: 'app-root'
})
export class AppComponent {
  constructor(private seo: SeoService) {
    const config: SeoConfig = {
      title: 'Trilon SeoService Demo',
      description: 'Trilon SEO - Description',
      locale: 'en_US',
      url: 'https://trilon.io',
      type: 'website',
      msapplicationTileColor: '#000',
      themeColor: '#fff',
      og: {
        site_name: 'Trilon Consulting',
        image_url: 'https://trilon.io/meta/og-image.png'
      },
      twitter: {
        image_url: 'https://trilon.io/meta/twitter-image.png',
        summary_card: 'summary_large_image',
      },
      keywords: 'trilon, nestjs consulting, nestjs courses, node consulting, angular consulting',
      article: {
        tags: ['seo', 'trilon', 'universal'],
        section: 'trilon'
      },
      link: [
        { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: 'https://trilon.io' },
        { rel: 'canonical', href: 'https://trilon.io/blog' }
      ],
    };

    // initialize your base Meta setup
    // (this can be done again at any point if you need to replace it entirely)
    this.seo.initializeBaseMeta(config);
  }
}
```

Now let's say we've traveled to a different Route, and we want that Component to update a few important pieces of the SEO, without having to re-do _everything_.

```ts
export class TrilonBlogComponent {
  constructor(private seo: SeoService) {
    this.seo.update({
      title: 'Blog - Trilon.io',
      description: 'Learn more about NestJS, Angular and Fullstack Development at the Trilon Blog!'
      url: 'https://trilon.io/blog'
    })
  }
}
```

This will update just the necessary portions added above, while leaving everything else intact!

---

## PlatformService

Typically in Angular Universal Applications you have sections of code that can only run in certain platforms (browser or server), with PlatformService you can simply add it in the constructor of any Component/Service within your application, and run code specific to that platform - without causing Errors in the _other_ platform.

```ts
import { PlatformService } from '@trilon/ng-universal';

@Component({ /* ... */ })
export SomeComponent {
  constructor(private platformService: PlatformService) {
    if (platformService.isBrowser) {
      // Run browser-specific code that would cause errors in the Server/Node platform!
      // $('body').addClass('');
    }

    if (platformService.isServer) {
      // Run Server/Node-specific code
    }
  }
}

```

## IsBrowser | IsService Directives

Equally important with Angular Universal is displaying only Components/UI that are _neccessary_ for the given platform.  To improve performance, or to avoid Components all-together we can use `*isBrowser` or `*isServer` Directives to display/hide specific things given a platform.

Take as an example a Twitter Feed section that's connected to 3rd party Components/Libraries and API-calls. We don't need Universal to display these as there is no SEO benefit, and most likely they will slow down our Render time.  In this case it's most beneficial to simply avoid it entirely during server-side rendering, and have _only_ the **Browser** display and render this Component!

```html
<ng-container *isBrowser>
  <app-twitter-feed></app-twitter-feed>
</ng-container>
```

## createWindowMocks

Mock Window & Document in Node to prevent "window undefined" Node errors.  Remember these globals don't exist in the Node platform, so it's important to Mock them and fill them with your app skeleton html (utilizing Domino), otherwise 3rd party libraries (and even your own code), can cause errors during a server-side render.

In your `server.ts` file, grab your `template` (html) and pass it into the createWindowMocks utility to populate your Node globals for window|document.

```ts
import { createWindowMocks } from '@trilon/ng-universal';

// Make sure you grab wherever your index.html is, we want to use that html as a -base- for Domino
const template = readFileSync(join(DIST_FOLDER, 'Your_CLI_Project_Name', 'index.html')).toString();
createWindowMocks(template);
```

You can additionally pass in more globals for window or document incase you need to patch/mock other things such as `$` from jQuery / etc.

```ts
createWindowMocks(template, /* additional window mocks*/ {
  $: {},
  someOtherWindowProp: {}
})
```

More Documentation & Utilies Coming soon...

---

# TransferHttpCacheModule Setup

In order to prevent UI flickers with Angular Universal we want to make sure we're caching Http responses and re-using them during the client-side render. This Module helps not only Cache `GET` requests, but `POST` requests as well.

```ts
// Import the Application Insights module and the service provider
import { TransferHttpCacheModule } from '@trilon/ng-universal';

// Filter out which POST requests you -want- to Cache
export function cachePostFilter(req, key) {
  // If intercepted request URL contains any part of the below list, cache it
  const cacheList = ['/posts', '/products'];
  
  const cacheRequest = cacheList.filter(p => {
    // Test against current req.url that's intercepted
    if (req.url.includes(p)) {
      return true;
    }
    return false;
  }).length >= 0;

  return cacheRequest;
}

@NgModule({
  imports: [
    // ...
    // Add the Module to your imports
    TransferHttpCacheModule.forRoot({
      cachePOSTFilter: cachePostFilter
    })
  ]
})
export class AppModule { }
```


# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=e51384)](/LICENSE) 

Copyright (c) 2019 [Trilon](https://trilon.io)

[![Twitter Follow](https://img.shields.io/twitter/follow/Trilon_io.svg?style=social)](https://twitter.com/Trilon_io)

----

# Trilon Consulting 

## JavaScript, Node, NestJS Consulting from Open-Source Fanatics and Key Contributors!

Check out **[Trilon.io](https://Trilon.io)** for more info! 

Contact us at <hello@trilon.io>, and let's talk about your projects needs.

<br><br>

<p align="center">
  <a href="https://trilon.io" target="_blank">
        <img width="500" height="auto" src="https://trilon.io/trilon-logo-clear.png" alt="Trilon.io - Angular Universal, NestJS, JavaScript Application Consulting Development and Training">
  </a>
</p>

<h3 align="center"> Made with :heart: by <a href="https://trilon.io">Trilon.io</a></h3>

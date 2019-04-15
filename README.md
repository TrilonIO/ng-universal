# Angular Universal Schematics & Helpers - Trilon

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
  - Helpers / Utilities
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

export function cachePostFilter (req, key) {
  // This will Cache -ALL- "POST" Responses, you can also make sure only specific requests get cached (or none)
  // By utilizing req.url and allowing specific ones to return true
  return true;
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

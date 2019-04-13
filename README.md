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

---

### AppModule Setup

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

More Documentation Coming soon...


# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=e51384)](/LICENSE) 

Copyright (c) 2016-2019 [Trilon](https://trilon.io)

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

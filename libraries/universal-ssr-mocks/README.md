# Create Node Global Mocks - Angular Universal

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
$ npm i -S @trilon/universal-ssr-mocks
```

## Modules Available
- [createWindowMocks](#createwindowmocks)

---

## createGlobalMocks

> Note: Breaking changes: Renamed to `createGlobalMocks`. In `@trilon/ng-universal` v2+ there was a breaking change, and this method has now been introduced as its _own_ npm package to avoid domino being bundled in client angular bundles.

Mock Window & Document in Node to prevent "window undefined" Node errors.  Remember these globals don't exist in the Node platform, so it's important to Mock them and fill them with your app skeleton html (utilizing Domino), otherwise 3rd party libraries (and even your own code), can cause errors during a server-side render.

In your `server.ts` file, grab your `template` (html) and pass it into the createGlobalMocks utility to populate your Node globals for window|document.

```ts
import { createGlobalMocks } from '@trilon/universal-ssr-mocks';

// Make sure you grab wherever your index.html is, we want to use that html as a -base- for Domino
const template = readFileSync(join(DIST_FOLDER, 'Your_CLI_Project_Name', 'index.html')).toString();
createGlobalMocks(template);
```

You can additionally pass in more globals for window or document incase you need to patch/mock other things such as `$` from jQuery / etc.

```ts
createWindowMocks(template, /* additional window mocks*/ {
  $: {},
  someOtherWindowProp: {}
})
```

---

## License

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

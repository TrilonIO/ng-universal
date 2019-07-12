import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { join } from 'path';


export interface IMock {
  [key: string]: any;
}

/*
 * Window | Document | Global mocking
 */
export function createWindowMocks(
  template: string,
  additionalWindowMocks: IMock = {},
  globalNodeMocks: IMock = {}
) {
  if (!template && typeof template !== 'string') {
    console.error(`
      A template of your index.html file must be provided.
      Example:
        import { createWindowMocks } from '@trilon/ng-universal';

        const template = readFileSync(join(DIST_FOLDER, 'Your_CLI_Project_Name', 'index.html')).toString();
        createWindowMocks(template);
    `);
    return;
  }
  const domino = require('domino');
  const win = domino.createWindow(template);
  const noop = () => {};

  win.scrollTo = noop;
  win.screen = {};
  win.alert = noop;
  win.requestAnimationFrame = noop;

  Object.keys(additionalWindowMocks).forEach(key => {
    win[key] = additionalWindowMocks[key];
  });

  global['window'] = win;
  global['document'] = win.document;
  global['navigator'] = {};
  global['CSS'] = null;
  global['Prism'] = null;
  global['HTMLElement'] = null;
  global['HTMLElement'] = win.HTMLElement;
  global['DOMTokenList'] = win.DOMTokenList;
  global['Node'] = win.Node;
  global['Text'] = win.Text;
  global['HTMLCanvasElement'] = win.HTMLCanvasElement;
  global['navigator'] = win.navigator;
  global['MutationObserver'] = getMockMutationObserver();
  global['requestAnimationFrame'] = noop;

  console.log('INSIDE WINDOW MOCKS');
  console.log(document);

  Object.keys(globalNodeMocks).forEach(key => {
    global[key] = globalNodeMocks[key];
  });

  Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
}

export function getMockMutationObserver() {
  return class {
    observe(node, options) {
    }
    disconnect() {
    }
    takeRecords() {
      return [];
    }
  };
}




enableProdMode();

async function bootstrap() {

  const html = join(process.cwd(), 'dist/browser', 'index.html');

  createWindowMocks(html)

  console.log('NEST BOOTSTRAP')
  console.log('~~~~~~~~~~~~~~~~~~~~')
  // console.log(window);

  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();

export interface IMock {
  [key: string]: any;
}

/*
 * Window | Document | Global mocking
 */
export function createGlobalMocks(
  template: string,
  additionalWindowMocks: IMock = {},
  globalNodeMocks: IMock = {}
) {
  if (!template && typeof template !== 'string') {
    console.error(`
      A template of your index.html file must be provided.
      Example:
        import { v } from '@trilon/universal-ssr-mocks';

        const template = readFileSync(join(DIST_FOLDER, 'Your_CLI_Project_Name', 'index.html')).toString();
        createGlobalMocks(template);
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

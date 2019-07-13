/*
 * Public API Surface of ng-universal
 */

export * from './lib/ng-universal.module';
export * from './lib/transfer-http-cache.module';

export * from './lib/directives/is-browser.directive';
export * from './lib/directives/is-server.directive';
export * from './lib/services/platform.service';
export * from './lib/services/window.service';
export * from './lib/services/seo.service';
export * from './lib/services/link.service';

export * from './lib/util/bootstrap.helpers';
export { createWindowMocks } from './lib/util/create-window-mocks';

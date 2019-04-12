import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { prebootstrap, afterbootstrap } from '../libraries/ng-universal/src/lib/util/bootstrap.helpers';

if (environment.production) {
  enableProdMode();
}

prebootstrap();

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    afterbootstrap();
  })
  .catch(err => console.error(err));
});

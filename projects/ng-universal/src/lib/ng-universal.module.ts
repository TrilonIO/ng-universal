import { NgModule } from '@angular/core';
import { NgUniversalComponent } from './ng-universal.component';

@NgModule({
  declarations: [NgUniversalComponent],
  imports: [
  ],
  exports: [NgUniversalComponent]
})
export class NgUniversalModule {
  constructor() {
    console.log(`\n\n--- NgUniversalModule Loaded ---\n\n`);
  }
}

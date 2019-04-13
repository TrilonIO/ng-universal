import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

import { PlatformService } from '../services/platform.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isServer]'
})
export class IsServerDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private platformService: PlatformService
  ) { }

  ngOnInit() {
    if (this.platformService.isServer) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

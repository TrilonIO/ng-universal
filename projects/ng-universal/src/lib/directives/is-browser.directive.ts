import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { PlatformService } from '../services/platform.service';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isBrowser]'
})
export class IsBrowserDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private platformService: PlatformService
  ) { }

  ngOnInit() {
    if (this.platformService.isBrowser) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  // Some typical window use-cases
  public navigator: any = {};
  public location: any = {};
  public document: any = {};

  // Google
  public googletag: {
    cmd: any[],
    [key: string]: any
  };
  // Google tag manager stub for web
  public dataLayer: Array<any> = [];

  public firstSSRRender: boolean;
  public bootstraping: boolean;
  public firstSSRNavigation: boolean;
  public devicePixelRatio: number;
  public innerWidth: number;
  public innerHeight: number;

  public addEventListener() {}

  public alert(msg: string) { return; }
  public confirm(msg: string) { return; }
  public btoa(msg: string): string { return null; }
  public scrollTo(a: number, b: number) { return null; }
  public open(...args: Array<any>): any { return null; }
  public setTimeout(handler: (...args: any[]) => void, timeout?: number): number { return 0; }
  public clearTimeout(timeoutId: number): void { }
  public setInterval(handler: (...args: any[]) => void, ms?: number, ...args: any[]): number { return 0; }
  public clearInterval(intervalId: number): void { }
  public resizeHeroText(textEl: HTMLElement): void { };

  // Google analytics stub for web
  public ga(command: string | Function, params?: any, extra?: any): void { }
}


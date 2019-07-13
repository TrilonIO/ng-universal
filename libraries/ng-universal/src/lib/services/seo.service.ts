import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

import { SeoModel } from './seo.interface';
import { LinkService } from './link.service';
import { LinkDefinition } from './link-definition.type';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private baseMeta;

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private readonly document: Document,
    private linkService: LinkService
  ) {}

  createBaseMeta(meta: SeoModel) {
    return this.baseMeta = {
      ...meta
    };
  }

  updateMeta(seoModel: SeoModel) {
    console.log(seoModel);

    Object.keys(seoModel).forEach(key => {
      const metaVal: any = seoModel[key];

      switch (key) {
        case 'title':
          this.title.setTitle(metaVal);
          return;
        case 'meta':
          metaVal.map((meta: MetaDefinition) => {
            console.log(meta);
            this.meta.updateTag(meta);
            return meta;
          });
          return;
        case 'link':
          metaVal.map((link: LinkDefinition) => {
            console.log('>>> link');
            console.log(link);
            this.linkService.updateTag(link);
            return link;
          });
          return;
        default:
          return;
      }
    });
  }

  fastMeta(seoModel: SeoModel) {
    // this.meta.addTags
    console.log(seoModel);

    Object.keys(seoModel).forEach(key => {
      const val = seoModel[key];
      console.log(key, val);

      switch (key) {
        case 'title':
          this.title.setTitle(val);
          return;
        case 'description':
          this.updateMetaTag('description', { content: val });
          return;
        default:
          return;
      }
    });
  }

  private updateMetaTag(name, metaDefinition: MetaDefinition) {
    const tag: MetaDefinition = {
      name,
      content: metaDefinition.content
    };
    this.meta.updateTag(tag, 'TESTING');
  }
}

// <title data-n-head="true">Trilon - Next-level Application Consulting</title>
// <meta data-n-head="true" charset="utf-8">
// <meta data-n-head="true" name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
// <meta data-n-head="true" name="HandheldFriendly" content="true">
// <meta data-n-head="true" data-hid="keywords" content="nestjs consulting, nest consulting, nestjs workshop, nestjs courses, node consulting, angular consulting">
// <meta data-n-head="true" data-hid="msapplication-TileColor" name="msapplication-TileColor" content="#da532c">
// <meta data-n-head="true" data-hid="theme-color" name="theme-color" content="#ffffff">
// <meta data-n-head="true" data-hid="og:url" property="og:url" content="https://trilon.io/">
// <meta data-n-head="true" data-hid="og:title" property="og:title" content="Consulting & Training from open-source fanatics - Trilon">
// <meta data-n-head="true" data-hid="og:description" property="og:description" content="Next-level Application Consulting, Development, and Workshops from key open-source contributors.">
// <meta data-n-head="true" data-hid="og:image" property="og:image" content="https://trilon.io/meta/og-image.png">
// <meta data-n-head="true" data-hid="og:image:secure_url" property="og:image:secure_url" content="https://trilon.io/meta/og-image.png">
// <meta data-n-head="true" data-hid="og:image:width" property="og:image:width" content="1200">
// <meta data-n-head="true" data-hid="og:image:height" property="og:image:height" content="630">
// <meta data-n-head="true" data-hid="twitter:card" property="twitter:card" content="summary_large_image">
// <meta data-n-head="true" data-hid="twitter:title" property="twitter:title" content="Consulting & Training from open-source fanatics - Trilon">
// <meta data-n-head="true" data-hid="twitter:site" property="twitter:site" content="@trilon_io">
// <meta data-n-head="true" data-hid="twitter:creator" property="twitter:creator" content="@trilon_io">
// <meta data-n-head="true" data-hid="twitter:description" property="twitter:description" content="Next-level Application Consulting, Development, and Workshops from key open-source contributors.">
// <meta data-n-head="true" data-hid="twitter:image" property="twitter:image" content="https://trilon.io/meta/twitter-image.png">
// <meta data-n-head="true" data-hid="twitter:image:alt" property="twitter:image:alt" content="Trilon, Inc. logo">
// <meta data-n-head="true" data-hid="mobile-web-app-capable" name="mobile-web-app-capable" content="yes">
// <meta data-n-head="true" data-hid="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="trilonio">
// <meta data-n-head="true" data-hid="author" name="author" content="Trilon">
// <meta data-n-head="true" data-hid="og:type" name="og:type" property="og:type" content="website">
// <meta data-n-head="true" data-hid="og:site_name" name="og:site_name" property="og:site_name" content="trilonio">
// <meta data-n-head="true" data-hid="description" name="description" content="Next-level consulting from NestJS and Angular Universal core team members. We give teams the push they need to truly succeed in today's ever-changing world.">

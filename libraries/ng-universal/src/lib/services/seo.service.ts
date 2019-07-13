import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

import { SeoModel, SeoConfig } from './seo.interface';
import { LinkService } from './link.service';
import { LinkDefinition } from './link-definition.type';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private baseMeta: SeoConfig;
  private metaUpdate: SeoConfig;

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private readonly document: any /* Document */,
    private linkService: LinkService
  ) {}

  initializeBaseMeta(baseMeta: SeoConfig) {
    return this.baseMeta = {
      ...baseMeta
    };
  }

  update(seoConfig?: SeoConfig) {

    this.metaUpdate = {
      ...this.baseMeta,
      ...seoConfig
    };

    const seo: SeoModel = {
      title: this.metaUpdate.title,
      meta: [
        // Essentials
        { property: 'keywords', content: this.metaUpdate.keywords },

        // Defaults
        { property: 'og:url', content: this.metaUpdate.url },
        { property: 'og:locale', content: this.metaUpdate.locale || 'en_US' },
        { property: 'og:type', content: this.metaUpdate.type || 'website' },
        { property: 'twitter:card', content: this.metaUpdate.twitter.summary_card || 'summary_large_image'},

        // Title
        { property: 'og:title', content: this.metaUpdate.title },
        { property: 'twitter:title', content: this.metaUpdate.title },
        { property: 'twitter:image:alt', content: this.metaUpdate.title },

        // Description
        { name: 'description', content: this.metaUpdate.description },
        { property: 'og:description', content: this.metaUpdate.description },
        { property: 'twitter:description', content: this.metaUpdate.description },

        ...(
          this.metaUpdate.og
          ? [
            ...(this.metaUpdate.og.site_name ? [{ property: 'og:site_name', content: this.metaUpdate.og.site_name }] : []),
            ...(this.metaUpdate.og.image_url ? [{ property: 'og:image', content: this.metaUpdate.og.image_url }] : []),
            { property: 'og:image:width', content: this.metaUpdate.og.image_width || '1200' },
            { property: 'og:image:height', content: this.metaUpdate.og.image_height || '630'}
          ]
          : []
        ),

        ...(
          this.metaUpdate.twitter
          ? [
            ...(this.metaUpdate.twitter.image_url ? [{ property: 'twitter:image', content: this.metaUpdate.twitter.image_url }] : []),
            ...(this.metaUpdate.twitter.site ? [{ property: 'twitter:site', content: this.metaUpdate.twitter.site }] : []),
            ...(this.metaUpdate.twitter.creator ? [{ property: 'twitter:creator', content: this.metaUpdate.twitter.creator }] : []),
            ...(this.metaUpdate.twitter.image_alt ? [{ property: 'twitter:image:alt', content: this.metaUpdate.twitter.image_alt }] : []),
          ]
          : []
        ),

        ...(this.metaUpdate.msapplicationTileColor
          ? [{ property: 'msapplication-TileColor', content: this.metaUpdate.msapplicationTileColor }]
          : []),

        ...(this.metaUpdate.themeColor
          ? [{ property: 'theme-color', content: this.metaUpdate.themeColor }]
          : []),


        // Blog-Related
        ...(this.metaUpdate.article && this.metaUpdate.article.tags
          ? [ ...this.metaUpdate.article.tags.map(tag => ({ name: 'article:tag', content: `${tag}`}) )]
          : []),

        ...(this.metaUpdate.article && this.metaUpdate.article.section
         ? [{ property: 'article:section', content: this.metaUpdate.article.section }]
         : []),
      ],
      link: (this.metaUpdate.link ? this.metaUpdate.link : null)
    };

    this.updateMeta(seo);
  }

  updateMeta(seoModel: SeoModel) {
    Object.keys(seoModel).forEach(key => {
      const metaVal: any = seoModel[key];

      switch (key) {
        case 'title':
          this.title.setTitle(metaVal);
          return;
        case 'meta':
          metaVal.map((meta: MetaDefinition) => {
            this.meta.updateTag(meta);
            return meta;
          });
          return;
        case 'link':
          metaVal.map((link: LinkDefinition) => {
            this.linkService.updateTag(link);
            return link;
          });
          return;
        default:
          return;
      }
    });
  }
}

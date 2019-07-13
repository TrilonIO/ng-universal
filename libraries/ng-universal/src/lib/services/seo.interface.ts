import { LinkDefinition } from './link-definition.type';

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}


export interface SeoConfig {
  title: string;
  description: string;
  locale?: string;
  url: string;
  type?: string;
  og?: {
      site_name?: string;
      summary_card?: string;
  };
  keywords?: string;
  article?: {
      tags?: string[];
      section?: string;
  };
}
export interface SeoModel {

  title?: string;
  meta?: MetaTag[];
  // meta: {
  //   description: string;
  //   keywords?: string;
  //   ogImage?: string;
  //   ogUrl?: string;
  //   twitterImage?: string;
  //   twitterSite?: string;
  //   // [ Optional ] - These have set default values if they haven't been done at creation
  //   twitterCard?: string; // summary_large_image
  // }[];


  link?: LinkDefinition[];

  // PWA Themeing
  msapplicationTileColor?: string;
  themeColor?: string;
}

export interface SeoUpdate {
  title?: string;

}

export interface OgModel {

}


// { hid: 'title', name: 'title', content: 'Trilon.io - Next level Application Consulting' },
// { hid: 'description', name: 'description', content: 'Trilon.io | Consulting' },
// { hid: 'keywords', content: 'nestjs consulting, nest consulting, nestjs workshop, nestjs courses, node consulting, angular consulting' },
// { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#da532c' },
// { hid: 'theme-color', name: 'theme-color', content: '#ffffff' },

// Facebook & Twitter cards
// { hid: 'og:url', property: 'og:url', content: 'https://trilon.io/' },
// { hid: 'og:title', property: 'og:title', content: 'Consulting & Training from open-source fanatics - Trilon' },
// { hid: 'og:description', property: 'og:description', content: 'Next-level Application Consulting, Development, and Workshops from key open-source contributors.' },
// { hid: 'og:image', property: 'og:image', content: 'https://trilon.io/meta/og-image.png' },
// { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
// { hid: 'og:image:height', property: 'og:image:height', content: '630' },
// { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
// { hid: 'twitter:title', property: 'twitter:title', content: 'Consulting & Training from open-source fanatics - Trilon' },
// { hid: 'twitter:site', property: 'twitter:site', content: '@trilon_io' },
// { hid: 'twitter:creator', property: 'twitter:creator', content: '@trilon_io' },
// { hid: 'twitter:description', property: 'twitter:description', content: 'Next-level Application Consulting, Development, and Workshops from key open-source contributors.' },
// { hid: 'twitter:image', property: 'twitter:image', content: 'https://trilon.io/meta/twitter-image.png' },
// { hid: 'twitter:image:alt', property: 'twitter:image:alt', content: 'Trilon, Inc. logo' }

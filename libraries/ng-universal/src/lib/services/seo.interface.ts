import { LinkDefinition } from './link-definition.type';

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface SeoConfig {
  title?: string;
  description?: string;
  locale?: string;
  url?: string;
  type?: string;

  msapplicationTileColor?: string;
  themeColor?: string;

  og?: {
    title?: string;
    site_name?: string;
    image_url?: string;
    image_width?: string;
    image_height?: string;
  };
  twitter?: {
    title?: string;
    image_url?: string;
    summary_card?: string;
    site?: string;
    creator?: string;
    description?: string;
    image_alt?: string;
  };

  keywords?: string;
  article?: {
    tags?: string[];
    section?: string;
};
  link?: LinkDefinition[];
}
export interface SeoModel {
  title?: string;
  meta?: MetaTag[];
  link?: LinkDefinition[];
}

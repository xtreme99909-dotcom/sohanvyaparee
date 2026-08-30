import type { MetadataRoute } from 'next';
import { publicSiteUrl } from './site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/leads', '/api/', '/pay/', '/payments/'] },
    sitemap: `${publicSiteUrl}/sitemap.xml`,
  };
}

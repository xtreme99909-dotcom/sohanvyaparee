import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/leads', '/api/'] },
    sitemap: 'https://sohan-website-studio.vercel.app/sitemap.xml',
  };
}

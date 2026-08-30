import type { MetadataRoute } from 'next';
import { publicSiteUrl as baseUrl } from './site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/services/complete-website-launch`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/d2c-commerce-launch`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/partners`, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/work`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/work/bongfoods`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work/studio-system`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work/private-market-concept`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/trust`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.25 },
    { url: `${baseUrl}/refund-cancellation`, changeFrequency: 'yearly', priority: 0.25 },
    { url: `${baseUrl}/delivery-fulfilment`, changeFrequency: 'yearly', priority: 0.25 },
  ];
}

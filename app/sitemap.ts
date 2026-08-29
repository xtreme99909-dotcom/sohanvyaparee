import type { MetadataRoute } from 'next';

const baseUrl = 'https://sohan-website-studio.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/services/complete-website-launch`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/d2c-commerce-launch`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/work`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/work/bongfoods`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work/studio-system`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work/private-market-concept`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}

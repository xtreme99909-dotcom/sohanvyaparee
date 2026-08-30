const fallbackSiteUrl = 'https://sohan-website-studio.vercel.app';

export const publicSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, '');

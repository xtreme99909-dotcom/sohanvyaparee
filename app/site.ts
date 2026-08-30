const fallbackSiteUrl = 'https://www.thespstudios.com';

export const publicSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, '');

export const studioBrand = {
  name: 'SP Studios',
  mark: 'SP',
  founder: 'Sohan Vyaparee',
  descriptor: 'Independent digital studio directed by Sohan Vyaparee',
} as const;

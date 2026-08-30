export const marketingPagePaths = [
  '/',
  '/services/complete-website-launch',
  '/services/d2c-commerce-launch',
  '/services/b2b-lead-generation-websites',
  '/partners',
  '/work',
  '/work/bongfoods',
  '/work/private-market-concept',
  '/work/studio-system',
] as const;

export type MarketingAttribution = {
  source: string;
  medium: string;
  campaign: string;
};

const attributionKey = 'sv:marketing-attribution';

export function readStoredMarketingAttribution() {
  try {
    const value = window.sessionStorage.getItem(attributionKey);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<MarketingAttribution>;
    return typeof parsed.source === 'string' && typeof parsed.medium === 'string' && typeof parsed.campaign === 'string'
      ? parsed as MarketingAttribution
      : null;
  } catch {
    return null;
  }
}

export function storeMarketingAttribution(attribution: MarketingAttribution) {
  try {
    window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
  } catch {
    // Attribution remains available for the current page when storage is unavailable.
  }
}

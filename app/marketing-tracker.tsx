'use client';

import { useEffect } from 'react';
import { marketingPagePaths, readStoredMarketingAttribution, storeMarketingAttribution, type MarketingAttribution } from '@/app/marketing-attribution';
import { marketingEventTypes, type MarketingEventType } from '@/app/marketing-events';
import { ownerBrowserStorageKey } from '@/app/marketing-owner';

const trackablePaths = new Set<string>(marketingPagePaths);

function readSessionValue(key: string) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}

function writeSessionValue(key: string, value: string) {
  try { window.sessionStorage.setItem(key, value); } catch { /* Tracking remains functional without storage. */ }
}

function removeSessionValue(key: string) {
  try { window.sessionStorage.removeItem(key); } catch { /* Nothing to clear. */ }
}

function isOwnerBrowser() {
  try { return window.localStorage.getItem(ownerBrowserStorageKey) === '1'; } catch { return false; }
}

function getSessionId() {
  const key = 'sv:marketing-session';
  const existing = readSessionValue(key);
  if (existing) return existing;
  const created = crypto.randomUUID();
  writeSessionValue(key, created);
  return created;
}

function getAttribution(params: URLSearchParams, externalReferrer: string): MarketingAttribution {
  const hasCampaignTags = params.has('utm_source') || params.has('utm_medium') || params.has('utm_campaign');
  const saved = readStoredMarketingAttribution();
  if (!hasCampaignTags && saved) return saved;

  const attribution = {
    source: params.get('utm_source') || externalReferrer || 'direct',
    medium: params.get('utm_medium') || (externalReferrer ? 'referral' : 'none'),
    campaign: params.get('utm_campaign') || '',
  };
  storeMarketingAttribution(attribution);
  return attribution;
}

export function MarketingTracker() {
  useEffect(() => {
    const pagePath = window.location.pathname;
    if (!trackablePaths.has(pagePath)) return;
    if (isOwnerBrowser()) return;

    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    let referrerHost = '';
    try { referrerHost = referrer ? new URL(referrer).hostname : ''; } catch { referrerHost = ''; }
    const externalReferrer = referrerHost && referrerHost !== window.location.hostname ? referrerHost : '';
    const sessionId = getSessionId();
    const attribution = getAttribution(params, externalReferrer);
    const base = {
      pagePath,
      sessionId,
      ...attribution,
      referrer,
    };

    function send(eventType: MarketingEventType) {
      const storageKey = `sv:event:${eventType}:${pagePath}`;
      if (readSessionValue(storageKey)) return;
      writeSessionValue(storageKey, '1');
      void fetch('/api/marketing-events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...base, eventType }),
        keepalive: true,
      }).catch(() => { removeSessionValue(storageKey); });
    }

    send('page_view');

    function trackClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-marketing-event]') : null;
      const eventType = target?.dataset.marketingEvent;
      if (eventType && marketingEventTypes.includes(eventType as MarketingEventType)) send(eventType as MarketingEventType);
    }

    function trackFormStart(event: FocusEvent) {
      const target = event.target instanceof Element ? event.target.closest('.brief-form') : null;
      if (target) send('brief_start');
    }

    function trackCustomEvent(event: Event) {
      const eventType = (event as CustomEvent<{ eventType?: string }>).detail?.eventType;
      if (eventType && marketingEventTypes.includes(eventType as MarketingEventType)) send(eventType as MarketingEventType);
    }

    document.addEventListener('click', trackClick, { capture: true });
    document.addEventListener('focusin', trackFormStart, { capture: true });
    window.addEventListener('sv:marketing-event', trackCustomEvent);
    return () => {
      document.removeEventListener('click', trackClick, { capture: true });
      document.removeEventListener('focusin', trackFormStart, { capture: true });
      window.removeEventListener('sv:marketing-event', trackCustomEvent);
    };
  }, []);

  return null;
}

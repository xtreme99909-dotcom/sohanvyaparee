'use client';

import { useEffect } from 'react';

const trackablePaths = new Set(['/', '/work/bongfoods']);

function readSessionValue(key: string) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}

function writeSessionValue(key: string, value: string) {
  try { window.sessionStorage.setItem(key, value); } catch { /* Tracking remains functional without storage. */ }
}

function removeSessionValue(key: string) {
  try { window.sessionStorage.removeItem(key); } catch { /* Nothing to clear. */ }
}

function getSessionId() {
  const key = 'sv:marketing-session';
  const existing = readSessionValue(key);
  if (existing) return existing;
  const created = crypto.randomUUID();
  writeSessionValue(key, created);
  return created;
}

export function MarketingTracker() {
  useEffect(() => {
    const pagePath = window.location.pathname;
    if (!trackablePaths.has(pagePath)) return;

    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    let referrerHost = '';
    try { referrerHost = referrer ? new URL(referrer).hostname : ''; } catch { referrerHost = ''; }
    const externalReferrer = referrerHost && referrerHost !== window.location.hostname;
    const sessionId = getSessionId();
    const base = {
      pagePath,
      sessionId,
      source: params.get('utm_source') || (externalReferrer ? referrerHost : 'direct'),
      medium: params.get('utm_medium') || (externalReferrer ? 'referral' : 'none'),
      campaign: params.get('utm_campaign') || '',
      referrer,
    };

    function send(eventType: 'page_view' | 'enquiry_click' | 'brief_start') {
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
      const target = event.target instanceof Element ? event.target.closest('[data-marketing-event="enquiry_click"]') : null;
      if (target) send('enquiry_click');
    }

    function trackFormStart(event: FocusEvent) {
      const target = event.target instanceof Element ? event.target.closest('.brief-form') : null;
      if (target) send('brief_start');
    }

    document.addEventListener('click', trackClick, { capture: true });
    document.addEventListener('focusin', trackFormStart, { capture: true });
    return () => {
      document.removeEventListener('click', trackClick, { capture: true });
      document.removeEventListener('focusin', trackFormStart, { capture: true });
    };
  }, []);

  return null;
}

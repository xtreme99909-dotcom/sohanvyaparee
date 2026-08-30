'use client';

import { useEffect, useState } from 'react';
import { ownerBrowserStorageKey } from '@/app/marketing-owner';

type ExclusionState = 'marking' | 'ready' | 'limited';

export function OwnerTrackingExclusion() {
  const [state, setState] = useState<ExclusionState>('marking');

  useEffect(() => {
    let active = true;
    const updateState = (nextState: ExclusionState) => {
      queueMicrotask(() => {
        if (active) setState(nextState);
      });
    };

    try {
      window.localStorage.setItem(ownerBrowserStorageKey, '1');
    } catch {
      updateState('limited');
      return;
    }

    let sessionId = '';
    try {
      sessionId = window.sessionStorage.getItem('sv:marketing-session') || '';
    } catch {
      updateState('ready');
      return;
    }

    if (!sessionId) {
      updateState('ready');
      return;
    }

    void fetch('/api/marketing-events/internal-session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId }),
      keepalive: true,
    }).then((response) => {
      if (!response.ok) throw new Error('Owner session could not be reclassified.');
      updateState('ready');
    }).catch(() => {
      updateState('limited');
    });

    return () => { active = false; };
  }, []);

  return (
    <p className="mt-4 border-l-2 border-[#17201c] pl-4 text-xs leading-6 text-black/60" role="status">
      {state === 'marking'
        ? 'Excluding this owner browser from website activity…'
        : state === 'ready'
          ? 'This browser is now excluded from future website activity. Open this protected dashboard once on each device you use to review the public site.'
          : 'Automatic owner exclusion is limited in this browser. Treat visit and click totals as directional until you open the dashboard with normal browser storage enabled.'}
    </p>
  );
}

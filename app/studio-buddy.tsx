'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

export function StudioBuddy() {
  const [open, setOpen] = useState(false);
  const [reaction, setReaction] = useState('');
  const reactionTimer = useRef<number | null>(null);

  const react = useCallback((message: string, duration = 1800) => {
    setReaction(message);
    if (reactionTimer.current) window.clearTimeout(reactionTimer.current);
    reactionTimer.current = window.setTimeout(() => setReaction(''), duration);
  }, []);

  useEffect(() => {
    function noticeIntent(event: globalThis.PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('[data-marketing-event="enquiry_click"]')) react('Let’s build it! ✦');
    }

    function noticeForm(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('.brief-form')) react('I’ll keep this easy.');
    }

    document.addEventListener('pointerover', noticeIntent, { passive: true });
    document.addEventListener('focusin', noticeForm);
    return () => {
      document.removeEventListener('pointerover', noticeIntent);
      document.removeEventListener('focusin', noticeForm);
      if (reactionTimer.current) window.clearTimeout(reactionTimer.current);
    };
  }, [react]);

  function followPointer(event: ReactPointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--buddy-x', `${x * 8}px`);
    event.currentTarget.style.setProperty('--buddy-y', `${y * 6}px`);
    event.currentTarget.style.setProperty('--buddy-turn', `${x * 5}deg`);
  }

  function resetPointer(event: ReactPointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.setProperty('--buddy-x', '0px');
    event.currentTarget.style.setProperty('--buddy-y', '0px');
    event.currentTarget.style.setProperty('--buddy-turn', '0deg');
    react('See you around!');
  }

  return (
    <aside className={open ? 'studio-buddy is-open' : 'studio-buddy'} aria-label="SP Buddy website guide">
      <div className="studio-buddy-panel" aria-hidden={!open}>
        <button type="button" className="studio-buddy-close" onClick={() => setOpen(false)} aria-label="Close SP Buddy">×</button>
        <span>SP Buddy · Website guide</span>
        <strong>What would you like to see?</strong>
        <p>I can take you to the right part of the website.</p>
        <div>
          <a href="/services/complete-website-launch#planner" onPointerEnter={() => react('Good place to start!')} onClick={() => setOpen(false)}>Find my website option <i>→</i></a>
          <a href="/work" onPointerEnter={() => react('Take a look ✦')} onClick={() => setOpen(false)}>See the work <i>→</i></a>
          <a href="/services/complete-website-launch#brief" onPointerEnter={() => react('I’m ready!')} onClick={() => setOpen(false)}>Start a project <i>→</i></a>
        </div>
        <small>Friendly site guide · no account needed</small>
      </div>
      <button
        type="button"
        className="studio-buddy-trigger"
        aria-expanded={open}
        aria-label={open ? 'Close SP Buddy' : 'Open SP Buddy website guide'}
        onClick={() => { setOpen((current) => !current); react(open ? 'See you!' : 'Hi! I can guide you.'); }}
        onPointerMove={followPointer}
        onPointerEnter={() => react('Hi there! 👋')}
        onPointerLeave={resetPointer}
      >
        <Image src="/sp-buddy.png" alt="" width={82} height={88} sizes="82px" priority={false} />
        <span>Need help?</span>
      </button>
      <span className={reaction ? 'studio-buddy-reaction is-visible' : 'studio-buddy-reaction'} role="status" aria-live="polite">{reaction}</span>
    </aside>
  );
}

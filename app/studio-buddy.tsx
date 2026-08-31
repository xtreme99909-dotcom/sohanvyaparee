'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type BuddyMood = 'idle' | 'curious' | 'happy' | 'wave' | 'thinking';

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function StudioBuddy() {
  const [open, setOpen] = useState(false);
  const [reaction, setReaction] = useState('');
  const [mood, setMood] = useState<BuddyMood>('idle');
  const buddyRef = useRef<HTMLElement>(null);
  const openRef = useRef(false);
  const nearRef = useRef(false);
  const reactionTimer = useRef<number | null>(null);
  const moodTimer = useRef<number | null>(null);

  const settleMood = useCallback((nextMood: BuddyMood, duration = 1100) => {
    setMood(nextMood);
    if (moodTimer.current) window.clearTimeout(moodTimer.current);
    if (!duration) return;
    moodTimer.current = window.setTimeout(() => {
      setMood(openRef.current || nearRef.current ? 'curious' : 'idle');
    }, duration);
  }, []);

  const react = useCallback((message: string, duration = 1800, nextMood: BuddyMood = 'happy') => {
    setReaction(message);
    settleMood(nextMood, duration);
    if (reactionTimer.current) window.clearTimeout(reactionTimer.current);
    reactionTimer.current = window.setTimeout(() => setReaction(''), duration);
  }, [settleMood]);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pointerFrame = 0;
    let pointerX = window.innerWidth;
    let pointerY = window.innerHeight;

    function followVisitor(event: globalThis.PointerEvent) {
      if (motionPreference.matches || event.pointerType === 'touch') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        const buddy = buddyRef.current;
        if (!buddy) return;
        const anchorX = window.innerWidth - 66;
        const anchorY = window.innerHeight - 68;
        const deltaX = pointerX - anchorX;
        const deltaY = pointerY - anchorY;
        const distance = Math.hypot(deltaX, deltaY);

        buddy.style.setProperty('--buddy-look-x', `${clamp(deltaX / 34, -10, 7)}px`);
        buddy.style.setProperty('--buddy-look-y', `${clamp(deltaY / 42, -7, 5)}px`);
        buddy.style.setProperty('--buddy-look-turn', `${clamp(deltaX / 48, -6, 5)}deg`);

        if (distance < 185 && !nearRef.current) {
          nearRef.current = true;
          if (!openRef.current) settleMood('curious', 0);
        } else if (distance > 245 && nearRef.current) {
          nearRef.current = false;
          if (!openRef.current) setMood('idle');
        }
      });
    }

    function noticeIntent(event: globalThis.PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('[data-marketing-event="enquiry_click"]')) react('Let’s build it! ✦', 1800, 'happy');
      else if (event.target.closest('[data-marketing-event="proof_click"]')) react('Good choice — take a look.', 1500, 'curious');
    }

    function noticeForm(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('.brief-form')) react('I’ll keep this easy.', 1700, 'thinking');
    }

    const idlePlay = window.setInterval(() => {
      if (!document.hidden && !openRef.current && !nearRef.current) settleMood('wave', 1050);
    }, 9200);

    document.addEventListener('pointermove', followVisitor, { passive: true });
    document.addEventListener('pointerover', noticeIntent, { passive: true });
    document.addEventListener('focusin', noticeForm);
    return () => {
      document.removeEventListener('pointermove', followVisitor);
      document.removeEventListener('pointerover', noticeIntent);
      document.removeEventListener('focusin', noticeForm);
      window.clearInterval(idlePlay);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      if (reactionTimer.current) window.clearTimeout(reactionTimer.current);
      if (moodTimer.current) window.clearTimeout(moodTimer.current);
    };
  }, [react, settleMood]);

  function toggleBuddy() {
    const nextOpen = !open;
    openRef.current = nextOpen;
    setOpen(nextOpen);
    react(nextOpen ? 'Hi! I can guide you.' : 'See you!', nextOpen ? 1900 : 1200, nextOpen ? 'happy' : 'wave');
  }

  function closeBuddy() {
    openRef.current = false;
    setOpen(false);
    react('See you soon!', 1200, 'wave');
  }

  return (
    <aside ref={buddyRef} className={open ? 'studio-buddy is-open' : 'studio-buddy'} data-mood={mood} aria-label="SP Buddy website guide">
      <div className="studio-buddy-panel" aria-hidden={!open} inert={!open}>
        <button type="button" className="studio-buddy-close" onClick={closeBuddy} aria-label="Close SP Buddy">×</button>
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
        aria-label={open ? 'Close SP Buddy' : 'Play with or open SP Buddy website guide'}
        onClick={toggleBuddy}
        onPointerEnter={() => react('Oh, hi! 👋', 1400, 'curious')}
        onPointerLeave={() => { if (!openRef.current) settleMood('idle', 0); }}
        onFocus={() => settleMood('curious', 0)}
        onBlur={() => { if (!openRef.current) settleMood('idle', 0); }}
      >
        <Image src="/sp-buddy.png" alt="" width={82} height={88} sizes="82px" priority={false} />
        <span>Need help?</span>
      </button>
      <span className={reaction ? 'studio-buddy-reaction is-visible' : 'studio-buddy-reaction'} role="status" aria-live="polite">{reaction}</span>
    </aside>
  );
}

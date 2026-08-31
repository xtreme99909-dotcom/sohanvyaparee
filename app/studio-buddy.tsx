'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type BuddyMood = 'idle' | 'curious' | 'happy' | 'wave' | 'thinking';
type BuddyPose = 'wave' | 'sit' | 'work' | 'water';

const buddySprites: Array<{ pose: BuddyPose; src: string }> = [
  { pose: 'wave', src: '/sp-buddy-pixel-wave.png' },
  { pose: 'sit', src: '/sp-buddy-pixel-sit.png' },
  { pose: 'work', src: '/sp-buddy-pixel-work.png' },
  { pose: 'water', src: '/sp-buddy-pixel-water.png' },
];

const ambientPoses: Array<{ pose: BuddyPose; mood: BuddyMood }> = [
  { pose: 'sit', mood: 'idle' },
  { pose: 'work', mood: 'thinking' },
  { pose: 'water', mood: 'idle' },
  { pose: 'wave', mood: 'wave' },
];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function StudioBuddy() {
  const [open, setOpen] = useState(false);
  const [reaction, setReaction] = useState('');
  const [mood, setMood] = useState<BuddyMood>('idle');
  const [pose, setPose] = useState<BuddyPose>('sit');
  const buddyRef = useRef<HTMLElement>(null);
  const openRef = useRef(false);
  const nearRef = useRef(false);
  const ambientPoseIndex = useRef(0);
  const poseHoldUntil = useRef(0);
  const reactionTimer = useRef<number | null>(null);
  const moodTimer = useRef<number | null>(null);

  const settleMood = useCallback((nextMood: BuddyMood, duration = 1100, nextPose?: BuddyPose) => {
    setMood(nextMood);
    if (nextPose) setPose(nextPose);
    poseHoldUntil.current = duration ? Date.now() + duration : 0;
    if (moodTimer.current) window.clearTimeout(moodTimer.current);
    if (!duration) return;
    moodTimer.current = window.setTimeout(() => {
      const engaged = openRef.current || nearRef.current;
      setMood(engaged ? 'curious' : 'idle');
      setPose(engaged ? 'wave' : 'sit');
      poseHoldUntil.current = 0;
    }, duration);
  }, []);

  const react = useCallback((message: string, duration = 1800, nextMood: BuddyMood = 'happy', nextPose: BuddyPose = nextMood === 'thinking' ? 'work' : 'wave') => {
    setReaction(message);
    settleMood(nextMood, duration, nextPose);
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
          if (!openRef.current) settleMood('curious', 0, 'wave');
        } else if (distance > 245 && nearRef.current) {
          nearRef.current = false;
          if (!openRef.current) {
            setMood('idle');
            setPose('sit');
          }
        }
      });
    }

    function noticeIntent(event: globalThis.PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('[data-marketing-event="enquiry_click"]')) react('Let’s build it! ✦', 1800, 'happy');
      else if (event.target.closest('[data-marketing-event="proof_click"]')) react('Good choice — take a look.', 1500, 'thinking', 'work');
    }

    function noticeForm(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('.brief-form')) react('I’ll keep this easy.', 1700, 'thinking');
    }

    const idlePlay = window.setInterval(() => {
      if (document.hidden || openRef.current || nearRef.current || Date.now() < poseHoldUntil.current) return;
      ambientPoseIndex.current = (ambientPoseIndex.current + 1) % ambientPoses.length;
      const next = ambientPoses[ambientPoseIndex.current];
      setMood(next.mood);
      setPose(next.pose);
    }, 6800);

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
    react(nextOpen ? 'Hi! I can guide you.' : 'See you!', nextOpen ? 1900 : 1200, nextOpen ? 'happy' : 'wave', 'wave');
  }

  function closeBuddy() {
    openRef.current = false;
    setOpen(false);
    react('See you soon!', 1200, 'wave', 'wave');
  }

  return (
    <aside ref={buddyRef} className={open ? 'studio-buddy is-open' : 'studio-buddy'} data-mood={mood} data-pose={pose} aria-label="SP Buddy website guide">
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
        onPointerEnter={() => react('Oh, hi! 👋', 1400, 'curious', 'wave')}
        onPointerLeave={() => { if (!openRef.current) settleMood('idle', 0, 'sit'); }}
        onFocus={() => settleMood('curious', 0, 'wave')}
        onBlur={() => { if (!openRef.current) settleMood('idle', 0, 'sit'); }}
      >
        <span className="studio-buddy-sprite-stack" aria-hidden="true">
          {buddySprites.map((sprite) => (
            <Image
              key={sprite.pose}
              src={sprite.src}
              alt=""
              width={320}
              height={320}
              sizes="96px"
              data-active={pose === sprite.pose}
              unoptimized
            />
          ))}
        </span>
        <span className="studio-buddy-label">Need help?</span>
      </button>
      <span className={reaction ? 'studio-buddy-reaction is-visible' : 'studio-buddy-reaction'} role="status" aria-live="polite">{reaction}</span>
    </aside>
  );
}

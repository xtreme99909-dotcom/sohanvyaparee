'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { FounderAvatar } from './founder-avatar';

const stages = [
  {
    label: 'Plan',
    title: 'Decide what the website needs to say and do.',
    signal: 'A clear plan before design.',
    detail: 'We agree the pages, messages and main customer action.',
  },
  {
    label: 'Design',
    title: 'Turn the plan into clear, original pages.',
    signal: 'Easy to understand and use.',
    detail: 'Visitors see the right message, proof and next step.',
  },
  {
    label: 'Build',
    title: 'Build the approved design for real screens.',
    signal: 'A working website, not a mock-up.',
    detail: 'Mobile layouts, forms and needed tools work together.',
  },
  {
    label: 'Launch',
    title: 'Test the important journeys and take it live.',
    signal: 'Ready for real customers.',
    detail: 'Final checks, launch details and handover stay connected.',
  },
] as const;

export function DirectionBoard() {
  const [activeStage, setActiveStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(query.matches);
    syncPreference();
    query.addEventListener('change', syncPreference);
    return () => query.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % stages.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, [activeStage, paused, reducedMotion]);

  const stage = stages[activeStage];

  function moveDirector(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--director-x', `${x * 12}px`);
    event.currentTarget.style.setProperty('--director-y', `${y * 8}px`);
    event.currentTarget.style.setProperty('--director-turn', `${x * 2.5}deg`);
  }

  function resetDirector(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty('--director-x', '0px');
    event.currentTarget.style.setProperty('--director-y', '0px');
    event.currentTarget.style.setProperty('--director-turn', '0deg');
    setPaused(false);
  }

  return (
    <div
      ref={boardRef}
      className="direction-board"
      data-paused={paused ? 'true' : 'false'}
      role="region"
      aria-label="How a complete website moves from plan to launch"
      onPointerMove={moveDirector}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={resetDirector}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!boardRef.current?.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="board-topline">
        <span>Project direction board</span>
        <span className="board-director"><FounderAvatar compact /><span><b>Directed by Sohan</b><small>Founder · Creative Director</small></span></span>
      </div>
      <div className="board-stage">
        <figure className="board-founder-character" aria-hidden="true">
          <Image src="/founder-character.png" alt="" width={224} height={448} sizes="224px" />
        </figure>
        <div key={`stage-${activeStage}`} className="board-stage-copy">
          <div className="stage-number">0{activeStage + 1}</div>
          <span className="availability"><i /> Now accepting website projects</span>
          <p>Current stage · {stage.label}</p>
          <h2>{stage.title}</h2>
          <div className="signal-card">
            <span>Main result</span>
            <strong>{stage.signal}</strong>
            <p>{stage.detail}</p>
          </div>
        </div>
      </div>
      <div className="board-progress" role="group" aria-label="Project stages">
        {stages.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={activeStage === index}
            aria-label={`Show stage ${index + 1}: ${item.label}`}
            className={activeStage === index ? 'active' : ''}
            onClick={() => setActiveStage(index)}
          >
            <span>0{index + 1}</span>
            <p>{item.label}</p>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

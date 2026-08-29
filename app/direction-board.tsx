'use client';

import { useEffect, useRef, useState } from 'react';

const stages = [
  {
    label: 'Direction',
    title: 'Find the sharpest story the business can own.',
    signal: 'Clarity before decoration.',
    detail: 'Every page earns its place in the customer journey.',
  },
  {
    label: 'Experience',
    title: 'Turn the strategy into a journey people understand.',
    signal: 'Structure creates confidence.',
    detail: 'Message, proof and action arrive in the right order.',
  },
  {
    label: 'Build',
    title: 'Make the approved direction work on a real screen.',
    signal: 'Polish meets the system.',
    detail: 'Responsive behavior, CMS and integrations move together.',
  },
  {
    label: 'Launch',
    title: 'Pressure-test the critical paths and carry it live.',
    signal: 'Accountability through go-live.',
    detail: 'QA, launch details and the final handoff stay connected.',
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

  return (
    <div
      ref={boardRef}
      className="direction-board"
      data-paused={paused ? 'true' : 'false'}
      role="region"
      aria-label="A complete website directed from strategy through launch"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!boardRef.current?.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="board-topline">
        <span>Live direction board</span>
        <span className="availability"><i /> Open for qualified enquiries</span>
      </div>
      <div className="board-stage">
        <div key={`stage-${activeStage}`} className="board-stage-copy">
          <div className="stage-number">0{activeStage + 1}</div>
          <p>Current stage · {stage.label}</p>
          <h2>{stage.title}</h2>
          <div className="signal-card">
            <span>Direction signal</span>
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

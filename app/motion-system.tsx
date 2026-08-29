'use client';

import { useEffect } from 'react';

const staggerGroups = [
  '.positioning-grid > *',
  '.work-heading > *',
  '.process-grid > article',
  '.ai-grid > *',
  '.services-grid > article',
  '.fit-section > *',
  '.about-grid > *',
  '.contact-grid > *',
  '.service-intent > div > *',
  '.service-use-cases > article',
  '.service-section-heading > *',
  '.service-phase-grid > article',
  '.service-proof-grid > article',
  '.engagement-table > .engagement-row:not(.engagement-head)',
  '.service-fit > *',
  '.service-faq > *',
  '.scope-planner-intro > *',
  '.case-statement-grid > *',
  '.case-section-heading > *',
  '.journey-grid > article',
  '.case-product-label > *',
  '.case-scope > *',
  '.scope-list > div',
  '.case-proof > *',
  '.case-cta-grid > *',
  '.work-index-heading > *',
  '.work-index-card',
  '.work-evidence-intro > *',
  '.work-evidence-row:not(.work-evidence-head)',
  '.work-index-cta-grid > *',
  '.bbj-case-intro > *',
  '.bbj-chapters > article',
  '.bbj-media-heading > *',
  '.bbj-media-grid > article',
  '.bbj-buyer-grid > *',
  '.bbj-routing > div',
  '.bbj-next-case > *',
  '.bbj-enquiry > .bbj-shell > *',
  '.bbj-concept-note > *',
] as const;

const singleRevealSelectors = [
  '.positioning-section > .section-index',
  '.project-card',
  '.section-heading-row',
  '.service-signal-strip',
  '.service-intent > .section-index',
  '.service-scope > .service-section-heading',
  '.scope-note',
  '.service-detail-link',
  '.market-case-window',
  '.case-browser',
  '.bbj-bridge',
  '.bbj-case-cover',
  '.founder-note',
] as const;

const entrancePanelSelectors = [
  '.direction-board',
  '.responsibility-board',
  '.case-fact-board',
  '.bbj-hero-stage',
  '.work-truth-ledger',
] as const;

export function MotionSystem() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      root.classList.add('motion-reduced');
      return () => root.classList.remove('motion-reduced');
    }

    root.classList.add('motion-enabled');

    const revealTargets = new Set<HTMLElement>();
    const entrancePanels = new Set<HTMLElement>();

    for (const selector of staggerGroups) {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add('motion-reveal');
        element.style.setProperty('--motion-delay', `${Math.min(index, 5) * 76}ms`);
        revealTargets.add(element);
      });
    }

    for (const selector of singleRevealSelectors) {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.classList.add('motion-reveal');
        revealTargets.add(element);
      });
    }

    for (const selector of entrancePanelSelectors) {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add('motion-entrance-panel');
        element.style.setProperty('--entrance-delay', `${180 + index * 70}ms`);
        entrancePanels.add(element);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -9% 0px', threshold: 0.08 },
    );

    revealTargets.forEach((element) => observer.observe(element));

    let frame = 0;
    let pointerFrame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight * 0.32;
    const updateScrollProgress = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      root.style.setProperty('--page-progress', progress.toFixed(4));
    };
    const requestProgressUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollProgress);
    };

    const paintPointer = () => {
      pointerFrame = 0;
      root.style.setProperty('--pointer-x', `${pointerX}px`);
      root.style.setProperty('--pointer-y', `${pointerY}px`);
    };
    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(paintPointer);
    };

    updateScrollProgress();
    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', requestProgressUpdate);
      window.removeEventListener('resize', requestProgressUpdate);
      window.removeEventListener('pointermove', updatePointer);
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      root.classList.remove('motion-enabled');
      root.style.removeProperty('--page-progress');
      root.style.removeProperty('--pointer-x');
      root.style.removeProperty('--pointer-y');
      revealTargets.forEach((element) => {
        element.classList.remove('motion-reveal', 'is-visible');
        element.style.removeProperty('--motion-delay');
      });
      entrancePanels.forEach((element) => {
        element.classList.remove('motion-entrance-panel');
        element.style.removeProperty('--entrance-delay');
      });
    };
  }, []);

  return (
    <div className="motion-layer" aria-hidden="true">
      <span className="motion-progress" />
      <span className="motion-pointer-glow" />
    </div>
  );
}

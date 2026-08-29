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
  '.partner-positioning-grid > *',
  '.partner-fit-section > .section-heading-row > *',
  '.partner-models > .section-heading-row > *',
  '.partner-model-grid > article',
  '.partner-qualification-grid > *',
  '.partner-signal-list > div',
  '.partner-proof > *',
  '.partner-proof-links > a',
  '.partner-enquiry-grid > *',
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
  '.partner-fit-board',
] as const;

const entrancePanelSelectors = [
  '.direction-board',
  '.responsibility-board',
  '.case-fact-board',
  '.bbj-hero-stage',
  '.work-truth-ledger',
  '.partner-principle-board',
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
    const tiltTargets = new Set<HTMLElement>();
    const tiltCleanups: Array<() => void> = [];

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

    const tiltSelectors = [
      '.project-card',
      '.work-index-card',
      '.services-grid > article',
      '.service-proof-grid > article',
      '.partner-model-grid > article',
      '.partner-proof-links > a',
    ];

    tiltSelectors.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.dataset.motionTilt = 'true';
        tiltTargets.add(element);

        let tiltFrame = 0;
        let latestX = 0;
        let latestY = 0;

        const paintTilt = () => {
          tiltFrame = 0;
          const rect = element.getBoundingClientRect();
          const xRatio = Math.min(1, Math.max(0, (latestX - rect.left) / rect.width));
          const yRatio = Math.min(1, Math.max(0, (latestY - rect.top) / rect.height));
          element.style.setProperty('--tilt-x', `${((0.5 - yRatio) * 3.2).toFixed(2)}deg`);
          element.style.setProperty('--tilt-y', `${((xRatio - 0.5) * 4.2).toFixed(2)}deg`);
          element.style.setProperty('--card-x', `${(xRatio * 100).toFixed(1)}%`);
          element.style.setProperty('--card-y', `${(yRatio * 100).toFixed(1)}%`);
        };

        const onPointerMove = (event: PointerEvent) => {
          if (event.pointerType === 'touch') return;
          latestX = event.clientX;
          latestY = event.clientY;
          if (!tiltFrame) tiltFrame = window.requestAnimationFrame(paintTilt);
        };

        const resetTilt = () => {
          if (tiltFrame) window.cancelAnimationFrame(tiltFrame);
          tiltFrame = 0;
          element.style.setProperty('--tilt-x', '0deg');
          element.style.setProperty('--tilt-y', '0deg');
          element.style.setProperty('--card-x', '50%');
          element.style.setProperty('--card-y', '50%');
        };

        element.addEventListener('pointermove', onPointerMove, { passive: true });
        element.addEventListener('pointerleave', resetTilt, { passive: true });
        tiltCleanups.push(() => {
          element.removeEventListener('pointermove', onPointerMove);
          element.removeEventListener('pointerleave', resetTilt);
          if (tiltFrame) window.cancelAnimationFrame(tiltFrame);
        });
      });
    });

    let frame = 0;
    let pointerFrame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight * 0.32;
    const updateScrollProgress = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      root.style.setProperty('--page-progress', progress.toFixed(4));
      document.querySelectorAll<HTMLElement>('.site-header').forEach((header) => {
        header.classList.toggle('is-scrolled', window.scrollY > 18);
      });
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
      tiltCleanups.forEach((cleanup) => cleanup());
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
      tiltTargets.forEach((element) => {
        delete element.dataset.motionTilt;
        element.style.removeProperty('--tilt-x');
        element.style.removeProperty('--tilt-y');
        element.style.removeProperty('--card-x');
        element.style.removeProperty('--card-y');
      });
      document.querySelectorAll<HTMLElement>('.site-header').forEach((header) => header.classList.remove('is-scrolled'));
    };
  }, []);

  return (
    <div className="motion-layer" aria-hidden="true">
      <span className="motion-progress" />
      <span className="motion-pointer-glow" />
    </div>
  );
}

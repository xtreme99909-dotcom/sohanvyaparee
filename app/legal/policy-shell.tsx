/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { ReactNode } from 'react';
import { paymentPolicyVersion } from '@/app/payments/policy';

export const policyVersion = paymentPolicyVersion;

const policyLinks = [
  { href: '/trust', label: 'Trust centre' },
  { href: '/terms', label: 'Terms' },
  { href: '/refund-cancellation', label: 'Refunds' },
  { href: '/delivery-fulfilment', label: 'Delivery' },
  { href: '/privacy', label: 'Privacy' },
];

export function PolicyShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f2f0e9] text-[#17201c]">
      <header className="border-b border-black/10 bg-[#f2f0e9]/95 px-5 py-5 backdrop-blur sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <a className="flex items-center gap-3" href="/" aria-label="Sohan Vyaparee Studio home">
            <span className="grid size-10 place-items-center rounded-full bg-[#17201c] font-serif text-sm italic text-white">SV</span>
            <strong className="text-sm">Sohan Vyaparee</strong>
          </a>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[.1em] text-black/55" aria-label="Trust and policy navigation">
            {policyLinks.map((link) => <a key={link.href} className="border-b border-transparent pb-1 hover:border-black/30 hover:text-black" href={link.href}>{link.label}</a>)}
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-black/50">{eyebrow}</p>
          <h1 className="mt-7 max-w-5xl font-serif text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl lg:text-9xl">{title}</h1>
          <p className="mt-9 max-w-3xl text-base leading-8 text-black/65 sm:text-lg">{intro}</p>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[.12em] text-black/45">Version · {policyVersion}</p>
        </div>

        <div className="mt-16 border-t border-black/15 pt-12 sm:mt-24 sm:pt-16">
          {children}
        </div>
      </article>

      <footer className="bg-[#17201c] px-5 py-12 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div><p className="font-serif text-4xl leading-none">Clarity before commitment.</p><p className="mt-4 max-w-lg text-xs leading-6 text-white/55">Project-specific scope, price, tax treatment, jurisdiction and acceptance gates belong in the signed statement of work. Do not pay if that record is missing or inconsistent.</p></div>
          <div className="flex flex-wrap gap-3"><a className="rounded-full border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[.1em]" href="/services/complete-website-launch#brief">Ask a project question</a><a className="rounded-full bg-[#d8ff63] px-5 py-3 text-[10px] font-bold uppercase tracking-[.1em] text-[#17201c]" href="/">Return to studio →</a></div>
        </div>
      </footer>
    </main>
  );
}

'use client';

import { useState } from 'react';

export function CheckoutButton({ reference, disabled }: { reference: string; disabled: boolean }) {
  const [accepted, setAccepted] = useState(false);
  const [state, setState] = useState<'idle' | 'opening' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function openCheckout() {
    if (!accepted || disabled) return;
    setState('opening');
    setMessage('');
    try {
      const response = await fetch(`/api/payments/${encodeURIComponent(reference)}/acceptance`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ accepted: true }),
      });
      const result = await response.json() as { error?: string; url?: string };
      if (!response.ok || !result.url) throw new Error(result.error || 'Secure checkout could not be opened.');
      window.location.assign(result.url);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Secure checkout could not be opened.');
    }
  }

  return (
    <div className="border border-white/15 bg-white/5 p-5">
      <label className="flex cursor-pointer items-start gap-3 text-xs leading-6 text-white/70">
        <input className="mt-1 size-4 accent-[#d8ff63]" type="checkbox" checked={accepted} onChange={(event) => { setAccepted(event.target.checked); setState('idle'); setMessage(''); }} disabled={disabled} />
        <span>I have reviewed the amount, milestone, scope and agreement references above, plus the <a className="border-b border-white/35 text-white" href="/terms" target="_blank">Terms</a>, <a className="border-b border-white/35 text-white" href="/refund-cancellation" target="_blank">Refund Policy</a>, <a className="border-b border-white/35 text-white" href="/delivery-fulfilment" target="_blank">Delivery Policy</a> and <a className="border-b border-white/35 text-white" href="/privacy" target="_blank">Privacy Policy</a>.</span>
      </label>
      <button className="mt-5 flex min-h-14 w-full items-center justify-between rounded-full bg-[#d8ff63] px-6 text-xs font-bold uppercase tracking-[.1em] text-[#17201c] disabled:cursor-not-allowed disabled:opacity-35" type="button" disabled={!accepted || disabled || state === 'opening'} onClick={openCheckout}>
        <span>{state === 'opening' ? 'Opening secure checkout…' : 'Continue to secure checkout'}</span><span aria-hidden>↗</span>
      </button>
      {message ? <p className="mt-4 text-xs leading-6 text-[#ffb7ad]" role="alert">{message}</p> : null}
      <p className="mt-4 text-[10px] leading-5 text-white/45">Checkout is provided by Razorpay. Never send card details, a bank password, PIN or OTP through chat, email or this website.</p>
    </div>
  );
}

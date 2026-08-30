export const marketingEventTypes = [
  'page_view',
  'enquiry_click',
  'proof_click',
  'planner_start',
  'planner_complete',
  'brief_start',
  'brief_submit',
  'brief_success',
  'brief_error',
] as const;

export type MarketingEventType = (typeof marketingEventTypes)[number];

export function emitMarketingEvent(eventType: MarketingEventType) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('sv:marketing-event', { detail: { eventType } }));
}

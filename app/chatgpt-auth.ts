import { env } from 'cloudflare:workers';
import { headers } from 'next/headers';

export type ChatGPTUser = {
  userId: string;
  email: string;
};

const ownerUserId = 'c7db48cc-aa8c-4865-b83c-1a12fa914a20';
const localPreviewOwnerEmail = 'seedy@sites.test';

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get('oai-authenticated-user-id');
  const email = requestHeaders.get('oai-authenticated-user-email');
  if (!userId || !email) return null;
  return { userId, email };
}

export function chatGPTSignInPath(returnTo: string): string {
  const safeReturnTo = returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/';
  return `/signin-with-chatgpt?return_to=${encodeURIComponent(safeReturnTo)}`;
}

export function isStudioOwner(user: ChatGPTUser) {
  const configuredOwnerEmail = env.STUDIO_OWNER_EMAIL?.trim().toLowerCase();
  return user.userId === ownerUserId
    || Boolean(configuredOwnerEmail && user.email.trim().toLowerCase() === configuredOwnerEmail)
    || (process.env.NODE_ENV !== 'production' && user.email.trim().toLowerCase() === localPreviewOwnerEmail);
}

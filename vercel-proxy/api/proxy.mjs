const UPSTREAM_ORIGIN = 'https://sohan-website-studio.xtreme99909.chatgpt.site';

const blockedPaths = new Set(['/leads', '/signin-with-chatgpt']);
const skippedRequestHeaders = new Set([
  'connection',
  'content-length',
  'host',
  'transfer-encoding',
  'x-forwarded-for',
  'x-forwarded-host',
  'x-forwarded-port',
  'x-forwarded-proto',
]);
const skippedResponseHeaders = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'transfer-encoding',
]);

function requestPath(req) {
  const raw = Array.isArray(req.query.path) ? req.query.path.join('/') : (req.query.path || '');
  const pathname = `/${String(raw).replace(/^\/+/, '')}`;
  const query = new URL(req.url, 'https://proxy.local').searchParams;
  query.delete('path');
  const suffix = query.toString();
  return suffix ? `${pathname}?${suffix}` : pathname;
}

function requestBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.body == null) return undefined;
  if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) return req.body;
  return JSON.stringify(req.body);
}

export default async function handler(req, res) {
  const path = requestPath(req);
  const pathname = new URL(path, UPSTREAM_ORIGIN).pathname;
  if (blockedPaths.has(pathname)) {
    res.status(404).send('Not found');
    return;
  }

  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (!value || skippedRequestHeaders.has(name.toLowerCase())) continue;
    headers.set(name, Array.isArray(value) ? value.join(', ') : value);
  }
  headers.set('accept-encoding', 'identity');
  headers.set('origin', UPSTREAM_ORIGIN);
  headers.set('x-forwarded-host', new URL(UPSTREAM_ORIGIN).host);
  headers.set('x-forwarded-proto', 'https');

  try {
    const upstream = await fetch(`${UPSTREAM_ORIGIN}${path}`, {
      method: req.method,
      headers,
      body: requestBody(req),
      redirect: 'manual',
    });

    for (const [name, value] of upstream.headers) {
      if (!skippedResponseHeaders.has(name.toLowerCase())) res.setHeader(name, value);
    }

    const publicOrigin = `https://${req.headers.host}`;
    const location = upstream.headers.get('location');
    if (location) res.setHeader('location', location.replace(UPSTREAM_ORIGIN, publicOrigin));

    res.status(upstream.status);
    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('text/') || contentType.includes('json') || contentType.includes('javascript') || contentType.includes('xml')) {
      const text = (await upstream.text()).replaceAll(UPSTREAM_ORIGIN, publicOrigin);
      res.send(text);
      return;
    }

    res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    res.status(502).send('The studio is temporarily unavailable.');
  }
}

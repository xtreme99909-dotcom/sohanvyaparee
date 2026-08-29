# Sohan Website Studio — clean public address

This small Vercel layer gives the existing studio a client-facing `vercel.app` address while a permanent custom domain is considered.

- Public pages and static assets use Vercel's native external rewrite so the upstream React server-component stream reaches the browser without being buffered by a serverless function.
- `/api/leads` and `/api/marketing-events` use the hardened function proxy so same-origin submissions and attribution work through the clean host.
- `/leads` and `/signin-with-chatgpt` are intercepted by a local 404 function and remain unavailable on the public address.
- The upstream application's canonical, Open Graph and structured-data URLs already point to `https://sohan-website-studio.vercel.app`.

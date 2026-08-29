# Sohan Website Studio — clean public address

This small Vercel edge layer gives the existing studio a client-facing `vercel.app` address while the permanent custom domain is selected. It forwards only to the fixed studio origin, rewrites public metadata to the clean address, preserves forms and tracking, and keeps the private lead dashboard unavailable on the public proxy.

/**
 * Custom Next.js image loader.
 *
 * TODO(cdn): Swap this local fallback for the production image CDN once we are
 * production-ready. When the CDN is provisioned, build an optimized URL from the
 * `src`, `width`, and `quality` args, e.g.:
 *
 *   const base = 'https://cdn.mambohotelgroup.com';
 *   const normalized = src.startsWith('/') ? src : `/${src}`;
 *   return `${base}${normalized}?w=${width}&q=${quality || 75}&auto=format`;
 *
 * For now we serve the original images from /public unchanged so the static
 * export keeps working until the CDN is ready.
 */
export default function imageLoader({ src }) {
  return src;
}

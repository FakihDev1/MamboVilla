# Image Delivery & LCP — Notes for Future Work

Tracking the Lighthouse "Improve image delivery" (~2 MB savings) and "LCP request
discovery" findings: the root cause, options considered, and what was done.

## Root cause

The site is a **static export** (`output: 'export'` in `next.config.mjs`) using a
**custom image loader** that returns the path unchanged:

```js
// src/imageLoader.js
export default function imageLoader({ src }) {
  return src;
}
```

So `next/image` does **not** resize or reformat anything — it serves the original
bytes from `/public`. Every byte Lighthouse flags must be saved by either
(a) optimizing the physical files, or (b) changing the pipeline.

Tooling note: only `sips` (macOS built-in) is available — no `cwebp`/`magick`/`sharp`.
`sips` can read WebP/AVIF but only **write** PNG/JPEG, so in-place WebP/AVIF
conversion needs new tooling.

## Worst offenders (from the audit)

| File                                | Stored             | Displayed                      | Note            |
| ----------------------------------- | ------------------ | ------------------------------ | --------------- |
| `Mambo Hotel Group logo.png`        | 1254x1254, ~1.5 MB | ~40 px (Header/Footer)         | ~75% of savings |
| `mnemba view.JPG`                   | 1600x1200, ~364 KB | <=800x600 (gallery)            |                 |
| `beachside view.jpg`                | 2048x1536, ~340 KB | full-bleed hero (homepage LCP) |                 |
| `Mambo Hills Safari Lodge logo.jpg` | 888x813, ~116 KB   | <=320 px hero                  |                 |

## Options

### A. Image delivery (~2,013 KiB)

1. **Optimize physical files in place** (CHOSEN). Resize/recompress with `sips`,
   same filenames, zero code changes. Keeps PNG/JPEG but ~90%+ smaller. Lowest-risk.
2. **Convert to WebP/AVIF.** ~30% smaller than (1) but needs new tooling and updating
   every `src` reference plus `src/data/mamboBeachHotel/gallery.js`.
3. **Fix the pipeline (durable):**
   - Finish the CDN loader TODO in `src/imageLoader.js` (Cloudinary/imgix/Vercel) ->
     return `?w=&q=&auto=format`. Then `width`/`sizes` shrink downloads automatically.
   - Or add `next-image-export-optimizer` to pre-generate resized WebP at build time.
   - Or drop `output: 'export'` and use Next's built-in optimizer (needs a Node host).

### B. LCP request discovery

The LCP element is each page's hero (`img.object-cover`). All heroes already use
`next/image` with `priority` — the canonical Next.js fix. It emits
`fetchpriority="high"`, `loading="eager"`, and the `<img>` is in the static HTML
(discoverable), so all three audit criteria pass. The remaining LCP win is shrinking
the hero file (covered by A).

Optional reinforcement if discovery still flags after a production build: add
`ReactDOM.preload(src, { as: 'image', fetchPriority: 'high' })` or a manual
`<link rel="preload" as="image">` in the route.

## What was done (A — Option 1)

Resized/recompressed in place with `sips` (originals recoverable via git):

- `Mambo Hotel Group logo.png` -> max 640 px (supports the ~300 px enlarge modal)
- `Mambo Hills Safari Lodge logo.jpg` -> max 700 px, quality ~70
- `mamboBeachHotel/mnemba view.JPG` -> max 1280 px, quality ~68
- `mamboBeachHotel/beachside view.jpg` -> max 1600 px, quality ~64 (homepage LCP)

## Recommended next step (durable fix)

Implement **A-Option 3 — the CDN loader**. Once `src/imageLoader.js` returns a real
resizing URL, the `width`/`sizes` already on every `next/image` shrink downloads
automatically and these manual optimizations become unnecessary.

# Mambo Hotel Group — Website

Official website for **Mambo Hotel Group**, managing:

- **Mambo Beach Hotel** — Matemwe, Zanzibar *(live)*
- **Mambo Hills Safari Lodge** — Mikumi National Park *(coming soon)*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animations | GSAP + ScrollTrigger |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout, fonts, metadata, favicon
│   └── page.js            # Tab routing (landing / beach / safari)
│
├── components/
│   ├── Header.jsx          # Site-wide navigation header
│   ├── Footer.jsx          # Site-wide footer
│   ├── HomeLanding.jsx     # Group landing page
│   ├── MamboBeachHotel.jsx # Beach hotel property page
│   ├── MamboHillsSafari.jsx# Safari lodge teaser page
│   ├── ReviewsSection.jsx  # Reusable reviews renderer
│   └── InquiryModal.jsx    # Direct enquiry modal form
│
└── data/
    └── mamboBeachHotel/
        ├── gallery.js      # Photo gallery entries
        ├── faqs.js         # FAQ accordion entries
        └── reviews.js      # Guest reviews

public/
└── images/
    ├── mamboBeachHotel/    # All beach hotel photos
    └── Mambo Hills Safari Lodge logo.jpg
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload on http://localhost:3000)
npm run dev

# Production build (verify before pushing)
npm run build
```

---

## Content Management

All content is managed through plain JS data files. No CMS or database required.

### Adding a guest review

Edit [`src/data/mamboBeachHotel/reviews.js`](src/data/mamboBeachHotel/reviews.js) and append to the `REVIEWS` array:

```js
{
  name: "Guest Name",
  meta: "Source · Date",          // e.g. "Google Review · June 2025"
  review: "Review text...",
  highlights: "Great view, Quiet", // optional, shows as tags
  response: "Hotel response...",   // optional, shows as a hotel reply
  ratings: { rooms: "5/5", service: "5/5", location: "5/5" },
},
```

### Adding a gallery photo

1. Drop the image into `public/images/mamboBeachHotel/`
2. Edit [`src/data/mamboBeachHotel/gallery.js`](src/data/mamboBeachHotel/gallery.js) and append:

```js
{ src: '/images/mamboBeachHotel/your-photo.jpg', category: 'exterior', alt: 'Descriptive alt text' },
```

Valid categories: `exterior` · `rooms` · `dining`

### Adding an FAQ

Edit [`src/data/mamboBeachHotel/faqs.js`](src/data/mamboBeachHotel/faqs.js) and append:

```js
{
  q: "Your question?",
  a: "Your answer.",
},
```

### Adding a new property

Create a new subfolder mirroring the beach hotel pattern:

```
src/data/mamboHillsSafari/
    gallery.js
    faqs.js
    reviews.js
```

Then create `src/components/MamboHillsSafari.jsx` and register it in `src/app/page.js`.

---

## Deployment Workflow

> ⚠️ **The `main` branch is connected to the live domain. Never push directly to `main`.**

### Step 1 — Create & push to `pre-production`

```bash
# Make sure you're up to date
git checkout main
git pull origin main

# Create (or switch to) the pre-production branch
git checkout -b pre-production
# or if it already exists:
git checkout pre-production
git merge main

# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "feat: describe your changes here"

# Push to remote
git push origin pre-production
```

### Step 2 — Test on pre-production

- Deploy the `pre-production` branch to your staging environment (Vercel, Netlify, etc.)
- Test on **mobile** and **desktop**
- Verify all links, the gallery, inquiry modal, and Booking.com CTA work correctly
- Check that the build passes: `npm run build`

### Step 3 — Open a Pull Request to `main`

On GitHub / Azure DevOps / your Git host:

1. Go to **Pull Requests → New Pull Request**
2. Set **base branch** → `main`
3. Set **compare branch** → `pre-production`
4. Title: a clear summary of the change (e.g. `CRO redesign — landing & hotel pages`)
5. Description: list what changed and what was tested
6. Request a review if needed, then **Merge**

> Once merged to `main`, the live domain will automatically update on your next deployment trigger.

### Hotfix workflow (urgent live fixes)

```bash
git checkout main
git pull origin main
git checkout -b hotfix/your-fix-name
# make the fix
git add .
git commit -m "fix: urgent fix description"
git push origin hotfix/your-fix-name
# Open PR directly to main with "hotfix" label
```

---

## Environment Notes

- **WhatsApp Booking** — booking buttons link directly to WhatsApp chat (`+447849243128`):
  - `src/views/HomeLanding.jsx` (hero CTA & booking panel)
  - `src/views/MamboBeachHotel.jsx` (hero CTA, mid-page CTA, sticky bar, final CTA)

- **Inquiry form** — the `InquiryModal.jsx` currently logs submissions to the console. To wire up real email delivery, integrate [Formspree](https://formspree.io/) or a similar service and update the `handleSubmit` function.

- **Images** — all images are served statically from `/public/images/`. For production performance, consider migrating to Next.js `<Image>` component for automatic optimisation and lazy loading.

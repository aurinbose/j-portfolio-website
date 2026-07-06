# Aurin Bose — Analytics Portfolio

A clean, recruiter-focused portfolio showcasing 3+ years of experience in data analytics, cloud migration, and enterprise data governance.

**Live:** https://aurinbose.github.io | https://aurinbose-portfolio.vercel.app

---

## What's Here

A single-page HTML portfolio designed to be scanned fast by recruiters. Highlights include:

- **Cloud Data Migration** — Oracle-to-PostgreSQL/AWS pipelines with minimal critical discrepancies at go-live
- **Enterprise Data Governance** — Corporate data standards, criticality scoring, and compliance frameworks
- **ESG Data Integration** — Enablon platform workflows with advanced SQL and .NET support
- **AI-Assisted Analytics** — Natural language data modelling proof-of-concepts

**Stack overview:** SQL (MySQL, PostgreSQL, Oracle), Python, Power BI, Tableau, AWS, Google BigQuery, Databricks, GitHub Copilot

---

## Design

Built with intentional visual choices:
- **Deep ink navy** palette with steel-blue accents — reflects precision and data-focused work
- **Animated SVG pipeline diagram** as the hero — your Oracle-to-AWS migration visualized as a live flow
- **IBM Plex Mono** for technical labels and stack tags — ties directly to your SQL/database identity
- **Fraunces serif** for headers — editorial weight, distinctive without being generic
- Responsive mobile-first layout; respects `prefers-reduced-motion` for accessibility

No templated AI defaults here — every color, typeface, and visual element was chosen specifically for a data analyst's story.

---

## Quick Start

### To host on **GitHub Pages**
1. Clone this repo
2. Ensure `index.html` is in the root
3. Push to a repo named `yourusername.github.io`
4. Site goes live at `https://yourusername.github.io`

### To host on **Vercel** (recommended)
1. Connect your GitHub repo at **vercel.com/new**
2. Vercel auto-deploys on every push
3. Get a live URL like `yourusername-portfolio.vercel.app`
4. Optional: configure a custom domain

### To run locally
```bash
# Simple: open in browser
open index.html

# Or spin up a local server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

---

## Making Changes

Edit `index.html` directly:
- **Hero section** — Update the opening pitch and navigation
- **Experience blocks** — Edit job titles, dates, workstreams, and bullet points
- **Skills grid** — Adjust categories and tech stacks
- **Contact links** — Swap email, phone, LinkedIn, GitHub

Color tokens are at the top in `:root` — adjust `--ink`, `--steel`, `--amber` to rebrand.

---

## Customization Tips

### Update colors
Find the CSS `:root` block:
```css
:root {
  --ink: #0F1B2D;           /* Main background */
  --steel: #6E93C7;         /* Primary accent */
  --amber: #D4A045;         /* Highlight accent */
  --slate: #8B94A3;         /* Secondary text */
  /* ... */
}
```

### Change typefaces
Fonts are imported from Google Fonts at the top. Swap `Fraunces`, `Inter`, or `IBM Plex Mono` for alternatives.

### Adjust spacing & sizing
- `--radius` controls border-radius (currently `3px` for minimal rounded corners)
- Section padding is set in `.wrap` (32px horizontal) and `section` (110px vertical)
- Type sizes use `clamp()` for responsive scaling

---

## Accessibility

- ✓ Semantic HTML structure
- ✓ Focus-visible outlines on all interactive elements
- ✓ Respects `prefers-reduced-motion` for users who disable animations
- ✓ WCAG-compliant color contrast
- ✓ SVG diagram includes `aria-label` for screen readers

---

## Performance

- Single HTML file — no build step, no dependencies
- Inline CSS and JavaScript — one HTTP request
- SVG diagram is natively animated (no image files)
- Fonts loaded async via Google Fonts
- ~45KB total (minified)

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). SVG animations require ES6 support (broadly available since 2017).

---

## Contact

- **Email:** aurinbose@gmail.com
- **Phone:** +91 7605018291
- **LinkedIn:** https://www.linkedin.com/in/aurin-bose
- **GitHub:** https://github.com/aurinbose

---

## License

This portfolio is personal work. Feel free to use it as inspiration for your own, but please don't copy it directly.

---

**Built for recruiters. Updated regularly.**

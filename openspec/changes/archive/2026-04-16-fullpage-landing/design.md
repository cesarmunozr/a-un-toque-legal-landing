# Design: fullpage-landing

**Change ID:** fullpage-landing
**Date:** 2026-04-13
**Project:** auntoquelegal-landing

---

## 1. Architecture Overview

### Route `/` (fullpage, interactive)

```
BaseLayout.astro (shared shell: <head>, fonts, meta, global CSS)
└── index.astro
    ├── <meta name="robots" content="noindex, nofollow">
    ├── <main id="fp-track" class="fp-track">
    │   ├── S01Intro.astro        (#1E1E1E, dark)
    │   ├── S02Value.astro        (#E0E0E0, paper)
    │   ├── S03Differentiators.astro  (#FAFAFA, bone)
    │   ├── S04Practice.astro     (#1E1E1E, dark)
    │   ├── S05Clients.astro      (#E0E0E0, paper)
    │   ├── S06Team.astro         (#FAFAFA, bone)
    │   └── S07Contact.astro      (#1E1E1E, dark)
    ├── <!-- Progress bar (fixed right edge) -->
    ├── <!-- Section counter (fixed top-right) -->
    ├── <!-- Hint prompt (fixed bottom-center, S01 only) -->
    └── <script> import("../scripts/fullpage.ts")
```

### Route `/landing` (static, SEO)

```
BaseLayout.astro
└── landing.astro
    ├── JSON-LD in <head> (Organization + LegalService)
    ├── TopBannerBack.astro         ("← Volver a la experiencia", fixed)
    ├── <main id="main">
    │   ├── LHero.astro
    │   ├── LDifferentiators.astro
    │   ├── LHowWeWork.astro        (5 steps)
    │   ├── LPracticeAreas.astro
    │   ├── LClients.astro
    │   ├── LTeam.astro             (full bios)
    │   └── LContact.astro
    └── LFooter.astro
```

### Shared Components

```
src/components/shared/
├── Logo.astro          (variant: 'dark' | 'light' | 'sand' — encapsulates leading-space filenames)
└── ContactForm.astro   (reused in S07Contact + LContact)
```

---

## 2. Complete File Structure

```
src/
  layouts/
    BaseLayout.astro                    [MODIFY — strip fontsource imports, switch to Montserrat]
  components/
    fullpage/
      S01Intro.astro                    [NEW]
      S02Value.astro                    [NEW]
      S03Differentiators.astro          [NEW]
      S04Practice.astro                 [NEW]
      S05Clients.astro                  [NEW]
      S06Team.astro                     [NEW]
      S07Contact.astro                  [NEW]
    landing/
      TopBannerBack.astro               [NEW]
      LHero.astro                       [NEW]
      LDifferentiators.astro            [NEW]
      LHowWeWork.astro                  [NEW]
      LPracticeAreas.astro              [NEW]
      LClients.astro                    [NEW]
      LTeam.astro                       [NEW]
      LContact.astro                    [NEW]
      LFooter.astro                     [NEW]
    shared/
      Logo.astro                        [NEW]
      ContactForm.astro                 [NEW]
    sections/                           [DELETE — entire directory, legacy from v1]
  pages/
    index.astro                         [REWRITE — fullpage entry]
    landing.astro                       [NEW — SEO page]
    sitemap.xml.ts                      [NEW — static endpoint, only /landing]
  scripts/
    fullpage.ts                         [NEW — Motion One engine]
  styles/
    global.css                          [REWRITE — @font-face ×9, @theme tokens, fp-* classes]
  data/
    site.ts                             [MODIFY — add clientLogos, siteMeta exports]
  assets/
    lawyers/                            [EXISTS — use for Astro <Image />]
    clients/                            [EXISTS — use for Astro <Image />]
    logos/                              [EXISTS — prefer SVGs from public/ via Logo.astro]
public/
  fonts/                                [EXISTS — all 9 Montserrat .otf files]
  logos/                                [EXISTS — " 6.svg", " 7.svg", " 8.svg" (leading space)]
  clients/                              [EXISTS]
  lawyers/                              [EXISTS]
  robots.txt                            [MODIFY — Allow /landing only]
package.json                            [MODIFY — add motion, remove fontsource ×2]
```

---

## 3. Global CSS (`src/styles/global.css`)

```css
@import "tailwindcss";

/* ── Self-hosted Montserrat (9 weights) ──────────────────────────────── */
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-Thin.otf") format("opentype");
  font-weight: 100; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-ExtraLight.otf") format("opentype");
  font-weight: 200; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-Light.otf") format("opentype");
  font-weight: 300; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-Regular.otf") format("opentype");
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-Medium.otf") format("opentype");
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-SemiBold.otf") format("opentype");
  font-weight: 600; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-Bold.otf") format("opentype");
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-ExtraBold.otf") format("opentype");
  font-weight: 800; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Montserrat";
  src: url("/fonts/Montserrat-Black.otf") format("opentype");
  font-weight: 900; font-style: normal; font-display: swap;
}

/* ── Brand tokens ─────────────────────────────────────────────────────── */
@theme {
  --color-ink:   #1E1E1E;
  --color-warm:  #807662;
  --color-sand:  #C1B7A7;
  --color-paper: #E0E0E0;
  --color-bone:  #FAFAFA;

  --font-sans: "Montserrat", system-ui, sans-serif;

  --breakpoint-sm:  390px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1280px;
  --breakpoint-2xl: 1536px;
}

*, *::before, *::after { box-sizing: border-box; }

html { color: #1E1E1E; }
body { font-family: "Montserrat", system-ui, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

/* ── Fullpage engine ───────────────────────────────────────────────────── */
html.fp-lock,
html.fp-lock body {
  overflow: hidden;
  height: 100dvh;
  overscroll-behavior: none;
  touch-action: none;
}

.fp-track {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
}

.fp-section {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  will-change: transform;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Initial state managed by fullpage.ts via aria-hidden + inline style */

/* ── Reduced motion ────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .fp-section { transition: none !important; }
}
```

---

## 4. Fullpage Engine (`src/scripts/fullpage.ts`)

### State Interface

```ts
interface FPState {
  current: number;          // 0-indexed current section
  total: number;            // 7
  animating: boolean;       // true during Motion One animation
  lastNav: number;          // performance.now() timestamp of last completed nav
}
```

### Constants

```ts
import { animate } from "motion";
const EASING = [0.76, 0, 0.24, 1] as const;
const DURATION = 0.7;        // seconds
const COOLDOWN = 800;         // ms between navigations
const SWIPE_MIN = 50;         // px minimum touch delta
```

### `navigate(dir: 1 | -1)` Function

```ts
function navigate(dir: 1 | -1): void {
  if (state.animating) return;
  if (performance.now() - state.lastNav < COOLDOWN) return;
  
  const next = state.current + dir;
  if (next < 0 || next >= state.total) return;

  const sections = document.querySelectorAll<HTMLElement>(".fp-section");
  const out = sections[state.current];
  const inc = sections[next];

  // Position incoming off-screen
  inc.style.transform = dir === 1 ? "translateY(100%)" : "translateY(-100%)";
  inc.setAttribute("aria-hidden", "false");
  inc.style.pointerEvents = "none";

  state.animating = true;

  const a1 = animate(
    out,
    { transform: dir === 1 ? ["translateY(0%)", "translateY(-100%)"] : ["translateY(0%)", "translateY(100%)"] },
    { duration: DURATION, easing: EASING }
  );
  const a2 = animate(
    inc,
    { transform: dir === 1 ? ["translateY(100%)", "translateY(0%)"] : ["translateY(-100%)", "translateY(0%)"] },
    { duration: DURATION, easing: EASING }
  );

  Promise.all([a1.finished, a2.finished]).then(() => {
    out.setAttribute("aria-hidden", "true");
    out.style.pointerEvents = "none";
    inc.style.pointerEvents = "";
    state.current = next;
    state.animating = false;
    state.lastNav = performance.now();
    updateProgress();
    updateCounter();
    // Dispatch enter event for per-section entrance animations
    inc.dispatchEvent(new CustomEvent("fp:enter", { bubbles: false }));
  });
}
```

### Event Listeners

```ts
// Keyboard
document.addEventListener("keydown", (e) => {
  if (["ArrowDown", "Enter", " "].includes(e.key)) { e.preventDefault(); navigate(1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); navigate(-1); }
});

// Click (ignore interactive elements and [data-no-nav] containers)
document.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  if (t.closest("a, button, input, textarea, select, [data-no-nav]")) return;
  navigate(1);
});

// Touch swipe
let touchY0 = 0;
document.addEventListener("touchstart", (e) => {
  touchY0 = e.touches[0].clientY;
}, { passive: true });
document.addEventListener("touchend", (e) => {
  const dy = e.changedTouches[0].clientY - touchY0;
  if (Math.abs(dy) < SWIPE_MIN) return;
  // If touch originated inside a [data-no-nav], skip
  const t = e.target as HTMLElement;
  if (t.closest("[data-no-nav]")) return;
  navigate(dy < 0 ? 1 : -1);
}, { passive: true });
```

### Progress Bar Update

```ts
function updateProgress(): void {
  const fill = document.querySelector<HTMLElement>("[data-progress-fill]");
  if (!fill) return;
  const pct = ((state.current + 1) / state.total) * 100;
  animate(fill, { height: `${pct}%` }, { duration: 0.5, easing: EASING });
}
```

### Counter Update

```ts
function updateCounter(): void {
  const el = document.querySelector<HTMLElement>("[data-counter]");
  if (!el) return;
  el.textContent = `${String(state.current + 1).padStart(2, "0")} / ${String(state.total).padStart(2, "0")}`;
}
```

### Hint Fade

```ts
function scheduleHintFade(): void {
  const hint = document.querySelector<HTMLElement>("[data-hint]");
  if (!hint) return;
  setTimeout(() => {
    animate(hint, { opacity: [1, 0] }, { duration: 0.6, easing: "ease-out" })
      .finished.then(() => { hint.style.display = "none"; });
  }, 3000);
}
```

### Reduced Motion Fallback

```ts
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
// If true: skip animate() calls, use direct style assignment instead
```

### Initialization

```ts
function init(): void {
  const sections = document.querySelectorAll<HTMLElement>(".fp-section");
  state.total = sections.length;
  state.current = 0;
  state.animating = false;
  state.lastNav = 0;

  document.documentElement.classList.add("fp-lock");

  // Set initial positions
  sections.forEach((s, i) => {
    s.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    s.style.transform = i === 0 ? "translateY(0%)" : "translateY(100%)";
    if (i !== 0) s.style.pointerEvents = "none";
  });

  updateProgress();
  updateCounter();
  scheduleHintFade();

  // Trigger S01 entrance animations
  sections[0].dispatchEvent(new CustomEvent("fp:enter", { bubbles: false }));
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", init)
  : init();
```

---

## 5. Component Specs

### `Logo.astro` (shared)

```astro
---
interface Props {
  variant: "dark" | "light" | "sand";
  maxWidth?: number;
  class?: string;
}
const { variant, maxWidth = 480, class: cls = "" } = Astro.props;
const files: Record<string, string> = {
  dark:  "/logos/ 7.svg",   // on #1E1E1E backgrounds
  light: "/logos/ 6.svg",   // on light/bone backgrounds
  sand:  "/logos/ 8.svg",   // on #E0E0E0 backgrounds
};
---
<img
  src={files[variant]}
  alt="A un toque legal"
  class={cls}
  style={`max-width: ${maxWidth}px; width: 100%;`}
  loading="eager"
  decoding="async"
/>
```

**Key:** The leading-space filename is isolated here. All other components use `<Logo variant="dark" />`.

### `ContactForm.astro` (shared)

Fields: Nombre, Teléfono, Email, Consulta (textarea). All with floating label (CSS `peer` technique). Submit button. Form `action` placeholder (`mailto:` or Formspree).

### `S01Intro.astro`

```astro
---
import Logo from "../shared/Logo.astro";
---
<section class="fp-section bg-[#1E1E1E] flex flex-col items-center justify-center" data-section="0" aria-hidden="false">
  <div class="text-center" data-animate-logo>
    <Logo variant="dark" maxWidth={480} class="w-[70vw] md:w-[480px]" />
    <p class="mt-8 text-xs tracking-[0.3em] font-light text-[#C1B7A7] uppercase">
      Cisternas · Lorenzini · Saleh · Santiago, Chile
    </p>
  </div>
  <p
    class="absolute bottom-[calc(env(safe-area-inset-bottom)+2rem)] left-1/2 -translate-x-1/2 text-xs font-light tracking-[0.15em] text-[#C1B7A7]"
    data-hint
  >
    ↓ toca para continuar
  </p>
</section>
<script>
  document.querySelector("[data-section='0']")?.addEventListener("fp:enter", () => {
    import("motion").then(({ animate }) => {
      const logo = document.querySelector("[data-animate-logo]");
      if (logo) animate(logo, { opacity: [0, 1] }, { duration: 1.2, delay: 0.2, easing: [0.76, 0, 0.24, 1] });
    });
  }, { once: true });
</script>
```

### `S02Value.astro`

Structure: top-left `<Logo variant="sand" maxWidth={160} />`. Center: headline (`font-black text-[5rem] md:text-[5rem] sm:text-[2.5rem]`), subtext, CTA button. CTA `data-nav-to="6"` — engine intercepts via JS and calls `navigate()` to S07.

### `S03Differentiators.astro`

Import `{ differentiators }` from `../../data/site`. Grid `grid-cols-3 md:grid-cols-1`. Each card wrapped with `data-card`. Entrance `fp:enter` event triggers staggered Motion One animation.

### `S04Practice.astro`

Import `{ practiceAreas }` from `../../data/site`. `<ul>` with dividers. Each `<li>` has `group` class for hover states. Staggered entrance animation.

### `S05Clients.astro`

```astro
---
import { Image } from "astro:assets";
import { testimonials, clientLogos } from "../../data/site";
import anfp from "../../assets/clients/anfp.png";
import betterfood from "../../assets/clients/betterfood_chile.jpeg";
import clearchannel from "../../assets/clients/clearchannel_chile.png";
import comudef from "../../assets/clients/comudef_laflorida_municipalidad.jpg";
import globalchannel from "../../assets/clients/globalchannel_chile.png";
const logoImgs = { anfp, betterfood_chile: betterfood, clearchannel_chile: clearchannel, comudef_laflorida_municipalidad: comudef, globalchannel_chile: globalchannel };
---
```

Top half: 3-col testimonials. Bottom half: client logos with Astro `<Image />` for auto-WebP.

### `S06Team.astro`

```astro
---
import { Image } from "astro:assets";
import { team } from "../../data/site";
import gonzalo from "../../assets/lawyers/gonzalo-cisternas.jpg";
// ... other imports
const lawyerImgs: Record<string, ImageMetadata> = { "gonzalo-cisternas": gonzalo, ... };
---
```

Desktop: `flex flex-row gap-6 overflow-hidden`. Mobile: `flex overflow-x-auto snap-x snap-mandatory` with `data-no-nav` on carousel wrapper.

### `S07Contact.astro`

```astro
---
import Logo from "../shared/Logo.astro";
import ContactForm from "../shared/ContactForm.astro";
import { contact } from "../../data/site";
---
<section class="fp-section bg-[#1E1E1E] relative" data-section="6">
  <div class="grid grid-cols-2 md:grid-cols-1 h-full ...">
    <div class="left-pane ...">
      <Logo variant="dark" maxWidth={140} />
      <div class="border-l-2 border-[#807662] pl-6 mt-8">...</div>
    </div>
    <div class="right-pane ...">
      <ContactForm />
    </div>
  </div>
  <p class="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-light text-[#807662]">
    © 2026 A un toque legal — Cisternas, Lorenzini & Saleh.
  </p>
</section>
```

---

## 6. Data Layer (`src/data/site.ts`)

### New exports to add

```ts
// Client logos
export interface ClientLogo {
  key: string;
  name: string;
  file: string;  // filename in src/assets/clients/
}
export const clientLogos: ClientLogo[] = [
  { key: "anfp", name: "ANFP", file: "anfp.png" },
  { key: "betterfood_chile", name: "BetterFood Chile", file: "betterfood_chile.jpeg" },
  { key: "clearchannel_chile", name: "Clear Channel Chile", file: "clearchannel_chile.png" },
  { key: "comudef_laflorida_municipalidad", name: "Municipalidad de La Florida", file: "comudef_laflorida_municipalidad.jpg" },
  { key: "globalchannel_chile", name: "Global Channel Chile", file: "globalchannel_chile.png" },
];

// Site metadata
export const siteMeta = {
  url: "https://auntoquelegal.cl",
  name: "A un toque legal",
  firm: "Cisternas, Lorenzini & Saleh",
  defaultTitle: "A un toque legal — Firma de Abogados Santiago, Chile",
  defaultDescription: "Cisternas, Lorenzini & Saleh. Firma de abogados en Santiago, Chile. Litigación civil, libre competencia, derecho laboral, familia.",
};
```

Keep all existing exports (differentiators, steps, practiceAreas, testimonials, team, contact).

---

## 7. Sitemap (`src/pages/sitemap.xml.ts`)

```ts
import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://auntoquelegal.cl/landing</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
```

### `public/robots.txt`

```
User-agent: *
Allow: /landing
Disallow: /

Sitemap: https://auntoquelegal.cl/sitemap.xml
```

---

## 8. Package Changes

```diff
"dependencies": {
  "@astrojs/check": "^0.9.8",
- "@fontsource-variable/cormorant-garamond": "^5.0.0",
- "@fontsource-variable/inter": "^5.0.0",
  "@tailwindcss/vite": "^4.0.0",
  "astro": "^5.0.0",
+ "motion": "^11.0.0",
  "sharp": "^0.33.0",
  "tailwindcss": "^4.0.0"
}
```

Apply command: `npm install motion && npm uninstall @fontsource-variable/cormorant-garamond @fontsource-variable/inter`

---

## 9. Key Technical Decisions

**Logo.astro wrapper for leading-space filenames.** The logo SVGs in `public/logos/` have a literal leading space (` 6.svg`, ` 7.svg`, ` 8.svg`). Astro serves these correctly from `public/`. The `Logo.astro` wrapper encapsulates the exact paths — only one place to update if filenames change. Do NOT URL-encode the space; the `src` attribute literal space works in browsers and Astro static serving.

**Motion One over CSS transitions.** Required for: concurrent animation of outgoing+incoming with `await finished`, exact `[0.76, 0, 0.24, 1]` cubic-bezier in both simultaneously, programmatic progress bar height animation, hint opacity fade. CSS transitions would require complex `transitionend` event juggling. Motion One is ~5KB gzipped, loaded only on `/`.

**Timestamp-based cooldown (no setTimeout).** `performance.now()` delta check prevents race conditions inherent in `setTimeout`-based debounce. The `isAnimating` flag prevents re-entry during animation; the `800ms` cooldown adds a post-animation buffer.

**`data-no-nav` for horizontal touch targets.** The S06 mobile carousel and any internal scroll areas use `data-no-nav`. The fullpage engine's touch and click handlers call `.closest("[data-no-nav]")` to skip navigation, allowing native scroll/swipe within those areas.

**`src/assets/` vs `public/` for images.** Lawyer and client images are in `src/assets/` — import them statically for Astro `<Image />` to generate optimized WebP with responsive `srcset`. SVG logos stay in `public/logos/` and are referenced via `<img src>` (SVGs don't benefit from Astro image processing).

**Separate component trees.** `fullpage/` and `landing/` components have fundamentally different interaction models. Shared primitives (Logo, ContactForm) go to `shared/`. This avoids complex conditional prop logic and keeps each tree independently comprehensible.

**`100dvh` exclusively.** The iOS Safari dynamic toolbar causes `100vh` to produce scrollable overflow. All fullpage heights use `100dvh`. `env(safe-area-inset-*)` adds padding inside sections for Dynamic Island.

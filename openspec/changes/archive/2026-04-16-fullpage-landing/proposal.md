# Proposal: fullpage-landing

## Intent

Complete rebuild of auntoquelegal.cl as a premium LegalTech editorial site for "A un toque legal" — Cisternas, Lorenzini & Saleh, Santiago, Chile. Two routes serve distinct purposes: `/` delivers an immersive fullpage interaction-driven experience (the brand's showpiece), while `/landing` serves as a static, crawlable SEO page with full content.

## Scope

- **Replace** entire src/ — layouts, components, pages, styles
- **Add** Motion One (`motion` npm package) for `/` animations
- **Remove** fontsource packages (Cormorant Garamond, Inter) — replaced by self-hosted Montserrat
- **Keep** Astro 5 + Tailwind CSS v4 + sharp + vercel.json
- **Two routes**: `src/pages/index.astro` (fullpage) + `src/pages/landing.astro` (SEO)
- **Component split**: `src/components/fullpage/` (fullpage sections) + `src/components/landing/` (static sections)

## Approach

### Brand System
- **Colors**: `#1E1E1E` (primary dark), `#807662` (warm mid), `#C1B7A7` (sand light), `#E0E0E0` (off-white)
- **Font**: Montserrat exclusively, self-hosted from `/public/fonts/` (9 weights: Thin, ExtraLight, Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black). `@font-face` defined in global CSS. Zero external font requests.
- **Logos**: `public/logos/ 6.svg` on light backgrounds, `public/logos/ 7.svg` on dark backgrounds, `public/logos/ 8.svg` on `#E0E0E0` backgrounds
- **Tone**: premium, editorial, precise — NOT startup, NOT tech illustrations

### Route 1: `/` (Fullpage Experience)
7 sections × 100dvh × 100vw. Interaction-driven navigation (click, ArrowDown/Up, Enter, swipe).

**Navigation mechanics:**
- Vertical slide: outgoing exits upward, incoming enters from below
- Duration 700ms, cubic-bezier(0.76, 0, 0.24, 1) via Motion One `animate()`
- Progress indicator: thin vertical bar right edge, color `#807662`, fills proportionally
- Section counter: `01 / 07` top-right, Montserrat Light, `#C1B7A7`, 11px
- First section hint: "↓ toca para continuar" centered bottom, fades out after 3s
- Lock browser scroll: `document.documentElement.style.overflow = 'hidden'` on mount
- Debounce: 800ms cooldown between transitions
- Touch: `touchstart`/`touchend`, min 50px swipe threshold

**7 Sections:**
1. **Intro** — `#1E1E1E` bg, logo `_7.svg` centered (max 480px desktop / 280px mobile), fade-in 1200ms delay 200ms. Firm name below.
2. **Propuesta de valor** — `#E0E0E0` bg, logo `_8.svg` top-left. Headline Montserrat Black 5rem. CTA "Consulta directa →" scrolls to S07.
3. **Diferenciadores** — `#FAFAFA` bg, 3 columns, large numerals Thin 9rem, staggered slide-up 150ms each.
4. **Áreas de práctica** — `#1E1E1E` bg, 5 rows, separated by 1px lines, hover lift effect, staggered enter.
5. **Clientes** — `#E0E0E0` bg, 3 testimonials top half, client logo strip bottom (grayscale → color on hover).
6. **El equipo** — `#FAFAFA` bg, 5 cards horizontal (desktop) / touch-swipe carousel (mobile), grayscale → color on hover.
7. **Contacto** — `#1E1E1E` bg, 50/50 split, left contact info + logo, right form with floating labels. Footer line.

### Route 2: `/landing` (Static SEO)
Standard scrollable page, same content, for search engines.
- Full `<head>`: title, meta description, OG, canonical `https://auntoquelegal.cl/landing`
- JSON-LD: Organization + LegalService schema.org
- `/` has `<meta name="robots" content="noindex, nofollow">`
- `sitemap.xml` includes only `/landing`
- Fixed top banner: "← Volver a la experiencia" linking to `/`
- Sections: Hero → Diferenciadores → Cómo trabajamos (5 steps) → Áreas → Clientes → Equipo (full bios) → Contacto → Footer

### Responsive
- Breakpoints: sm 390px, md 768px, lg 1024px, xl 1280px, 2xl 1536px
- `100dvh` (not `100vh`) for iOS Safari
- `env(safe-area-inset-*)` for Dynamic Island
- Min 44×44px tap targets
- Mobile fullpage sections: vertically stackable content, touch swipe carousel for team

### Performance
- `@font-face` with `font-display: swap`, self-hosted
- Astro `<Image />` for all photos (auto WebP + lazy)
- Motion One loaded only on `/`
- Target: LCP < 2s, CLS = 0

## Risks
- Logo filenames have leading space (` 6.svg`, ` 7.svg`, etc.) — must reference exactly or rename
- Motion One must be installed: `npm install motion`
- `src/assets/` has lawyers + clients images but brief says `public/lawyers/` and `public/clients/` — need to confirm which to use (Astro `<Image />` works best from `src/assets/`)
- Existing fontsource imports must be removed from package.json to avoid dead weight
- S03/S05/S06 on mobile: sections exceed natural 100dvh content — need internal scroll or layout adaptation

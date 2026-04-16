# Spec: fullpage-landing

**Change ID:** fullpage-landing
**Status:** Draft
**Date:** 2026-04-13
**Project:** auntoquelegal-landing (Astro 5 + Tailwind CSS v4 + Motion One + TypeScript)
**Routes:** `/` (fullpage interactive) · `/landing` (static SEO)

---

## 0. Scope

Replace entire `src/` (layouts, components, pages, styles, data). Install `motion` npm package. Remove `@fontsource-variable/cormorant-garamond` and `@fontsource-variable/inter`. Keep `astro.config.mjs`, `vercel.json`, `tsconfig.json`, `public/` assets.

---

## 1. Brand System

### Colors (CSS custom properties + Tailwind tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-ink` | `#1E1E1E` | Primary dark — dark backgrounds, headlines on light |
| `--color-warm` | `#807662` | Warm mid — dividers, labels, secondary text |
| `--color-sand` | `#C1B7A7` | Sand light — decorative text, tertiary elements |
| `--color-paper` | `#E0E0E0` | Off-white — S02, S05 backgrounds |
| `--color-bone` | `#FAFAFA` | Near-white — S03, S06 backgrounds |

### Typography

Font: **Montserrat exclusively**. Self-hosted from `/public/fonts/`. Zero external requests.

@font-face declarations (all with `font-display: swap`):

| Weight | File |
|--------|------|
| 100 (Thin) | `Montserrat-Thin.otf` |
| 200 (ExtraLight) | `Montserrat-ExtraLight.otf` |
| 300 (Light) | `Montserrat-Light.otf` |
| 400 (Regular) | `Montserrat-Regular.otf` |
| 500 (Medium) | `Montserrat-Medium.otf` |
| 600 (SemiBold) | `Montserrat-SemiBold.otf` |
| 700 (Bold) | `Montserrat-Bold.otf` |
| 800 (ExtraBold) | `Montserrat-ExtraBold.otf` |
| 900 (Black) | `Montserrat-Black.otf` |

Usage guide:
- Thin (100) / ExtraLight (200) → decorative large text, numerals
- Light (300) / Regular (400) → body copy
- Medium (500) / SemiBold (600) → UI labels, nav, captions
- Bold (700) / ExtraBold (800) → section titles
- Black (900) → hero headlines, large display text

### Logos

Filenames have **leading space** — reference exactly:

| File | Usage |
|------|-------|
| `/logos/ 6.svg` | Light backgrounds (Bone, Paper) |
| `/logos/ 7.svg` | Dark backgrounds (#1E1E1E) |
| `/logos/ 8.svg` | #E0E0E0 (Paper) backgrounds |

---

## 2. Route `/` — Fullpage Experience

### Navigation System

**Triggers:**
- Click anywhere on page (excluding `a`, `button`, `input`, `textarea`, `[data-no-nav]`)
- `ArrowDown`, `Enter`, `Space` → navigate forward
- `ArrowUp` → navigate backward
- Touch swipe up (delta > 50px) → forward; swipe down → backward

**Transition:**
- Outgoing: slides up (`translateY(0 → -100%)`)
- Incoming: enters from below (`translateY(100% → 0)`)
- Duration: `700ms` / `0.7s`
- Easing: `cubic-bezier(0.76, 0, 0.24, 1)` (as array `[0.76, 0, 0.24, 1]` for Motion One)
- Library: Motion One `animate()` function

**Progress indicator:**
- Fixed right edge, 2px wide, full `100dvh` height
- Inner fill element `[data-progress-fill]` color `#807662`, animates height proportionally
- Formula: `((currentIndex + 1) / totalSections) * 100`%
- Animation: `0.5s` same easing

**Section counter:**
- Fixed top-right, format `01 / 07`
- Font: Montserrat Light (300), 11px, `#C1B7A7`, letter-spacing `0.2em`
- Updates on every section change

**Scroll lock:**
- `document.documentElement.classList.add("fp-lock")` on init
- CSS class `html.fp-lock, html.fp-lock body { overflow: hidden; height: 100dvh; overscroll-behavior: none; touch-action: none; }`

**Debounce:** timestamp-based — `performance.now()` delta must exceed `800ms`. No `setTimeout` races. Also gated by `isAnimating` boolean during transition.

**Touch:** `touchstart` / `touchend` listeners (`passive: true`). Min delta: `50px`. Vertical delta only.

**Hint:** `"↓ toca para continuar"` centered at bottom of S01. Fades out after `3000ms` using Motion One `opacity: [1, 0]`, duration `0.6s`.

**Section initialization:** All sections positioned `position: absolute; inset: 0; width: 100vw; height: 100dvh`. S01 `aria-hidden="false"`, S02–S07 `aria-hidden="true"` with `transform: translateY(100%)`.

---

### S01 — Intro

**Background:** `#1E1E1E`
**Content:**
- Logo `/logos/ 7.svg` — centered, max-width `480px` desktop / `280px` mobile
- Below logo: `"CISTERNAS · LORENZINI · SALEH · SANTIAGO, CHILE"` — Montserrat Light 300, `12px`, letter-spacing `0.2em`, color `#C1B7A7`
- Hint: `"↓ toca para continuar"` — Montserrat Light 300, `12px`, `#C1B7A7`, centered bottom `env(safe-area-inset-bottom) + 2rem`

**Animations on section enter:**
- Logo: `opacity: [0, 1]` — duration `1200ms`, delay `200ms`, easing `[0.76, 0, 0.24, 1]`
- Firm name: fades up from `translateY(10px)` — duration `600ms`, delay `800ms`

---

### S02 — Propuesta de Valor

**Background:** `#E0E0E0`
**Content:**
- Logo `/logos/ 8.svg` — top-left, `160px` wide, `2rem` padding
- Headline (center, max-width `700px`): `"Resolución legal de primer nivel. Siempre a un toque."` — Montserrat Black 900, `5rem` desktop / `2.5rem` mobile, `#1E1E1E`, `line-height: 0.95`
- Subtext: `"Conocimiento jurídico de élite, entregado con la velocidad y precisión que su situación exige."` — Montserrat Light 300, `1.1rem`, `#807662`, max-width `600px`, `margin-top: 1.5rem`
- CTA button: `"Consulta directa →"` — outlined (border `1px solid #1E1E1E`), Montserrat SemiBold 600, `0.9rem`, letter-spacing `0.1em`. Hover: fills `#1E1E1E`, text `#E0E0E0`. Navigates to S07.

**Animations on section enter:**
- Headline words staggered slide-up, `80ms` stagger, `opacity: [0,1]` + `translateY([20px,0])`, duration `700ms`
- Subtext and CTA fade in after headline

---

### S03 — Diferenciadores

**Background:** `#FAFAFA`
**Layout:** 3-column grid desktop / 1-column stacked mobile; `padding: 5rem 8rem` desktop

**Content (3 cards):**

| Numeral | Title | Body |
|---------|-------|------|
| `01` | Respuesta en 24 horas | Respondemos toda consulta dentro de un día hábil. Su tiempo es tan valioso como el nuestro. |
| `02` | Acceso directo al equipo | Sin intermediarios. Habla directamente con el abogado a cargo desde el primer contacto. |
| `03` | Resultados medibles, plazos reales | Le decimos qué esperar, cuándo, y qué haremos en cada etapa. |

**Typography per card:**
- Numeral: Montserrat Thin 100, `9rem` (desktop) / `5rem` (mobile), `#C1B7A7`
- Title: Montserrat Bold 700, `1.1rem`, `#1E1E1E`, `margin-top: 0.5rem`
- Body: Montserrat Light 300, `0.9rem`, `#807662`, `margin-top: 0.75rem`

**Animations:** Staggered on section enter. Each card: `opacity: [0,1]` + `translateY([30px,0])`, duration `800ms`, delay `150ms × index`.

**Mobile:** Stack vertically; if content overflows 100dvh, add `overflow-y: auto; touch-action: pan-y` to inner wrapper.

---

### S04 — Áreas de Práctica

**Background:** `#1E1E1E`
**Layout:** Centered column, max-width `900px`; rows separated by `1px solid rgba(128,118,98,0.3)`

**Content (5 rows):**

| Num | Area | Description |
|-----|------|-------------|
| 01 | Litigación Civil Compleja | Representación estratégica en juicios civiles de alta complejidad. |
| 02 | Libre Competencia y Mercados Regulados | Asesoría ante la FNE y el TDLC en investigaciones y concentraciones. |
| 03 | Derecho Laboral | Despidos, tutela laboral, negociación colectiva y asesoría a empleadores. |
| 04 | Derecho de Familia y Patrimonio | Divorcios, tuición, alimentos y protección del patrimonio familiar. |
| 05 | Tribunales Superiores de Justicia | Recursos de apelación y casación ante Corte de Apelaciones y Corte Suprema. |

**Typography per row:**
- Number: Montserrat Light 300, `0.8rem`, `#807662`
- Area name: Montserrat SemiBold 600, `1.3rem`, white (`#E0E0E0`)
- Description: Montserrat Light 300, `0.85rem`, `#C1B7A7`
- Arrow `→`: Montserrat Light 300, `#807662`, right-aligned

**Hover:** Row background `rgba(128,118,98,0.1)`, arrow shifts right `6px` (`translateX(6px)`), transition `300ms ease`

**Animations:** Staggered slide-in from right, `80ms` stagger per row, on section enter.

---

### S05 — Clientes

**Background:** `#E0E0E0`
**Layout:** Top 50% testimonials (3 horizontal), bottom 50% client logo strip

**Testimonials (3):**

1. `"Resolví un problema laboral que arrastraba hace dos años en menos de tres semanas. La claridad con que me explicaron el proceso fue lo que más valoré."` — Carolina Méndez, Directora de RRHH
2. `"Buscaba un abogado que me hablara en español, no en juridiqués. Los encontré. Mi contrato quedó perfecto y entiendo cada cláusula."` — Rodrigo Fuentes, Emprendedor
3. `"Proceso de constitución de sociedad impecable, rápido y sin vueltas. Claridad total en honorarios desde el principio."` — Valentina Torres, Fundadora, startup tecnológica

**Testimonial typography:**
- Opening quote `"`: Montserrat Black 900, `6rem`, `#C1B7A7`, leading decoration
- Quote text: Montserrat Light italic, `1rem`, `#1E1E1E`
- Name: Montserrat SemiBold 600, `0.8rem`, letter-spacing `0.15em`, `#1E1E1E`
- Role: Montserrat Light 300, `0.75rem`, `#807662`

**Client logo strip:**
- Images from `src/assets/clients/` via Astro `<Image />` (WebP auto-conversion)
- CSS filter: `grayscale(1) opacity(0.5)` default, hover: `grayscale(0) opacity(1)`, transition `500ms`
- Caption below: `"Deporte profesional · Alimentación & FoodTech · Publicidad exterior · Sector público · Medios & Distribución"` — Montserrat Light 300, `0.7rem`, `#807662`, centered

**Mobile:** Testimonials stack vertically, section becomes internally scrollable with `overflow-y: auto`.

---

### S06 — El Equipo

**Background:** `#FAFAFA`
**Headline:** `"Quiénes llevan tu caso."` — Montserrat Bold 700, `2rem`, `#1E1E1E`
**Layout desktop:** `flex flex-row gap-6`, 5 cards equal width
**Layout mobile:** Touch-swipe carousel (`overflow-x: auto snap-x snap-mandatory`) with `data-no-nav`

**Team (5 members):**

| Name | Role | Image |
|------|------|-------|
| Gonzalo Cisternas Sobarzo | Director Legal | `gonzalo-cisternas.jpg` |
| Juan Pablo Lorenzini Paci | Libre Competencia y Mercados Regulados | `juan-pablo-lorenzini.jpg` |
| Daniela Saleh Navas | Litigación y Corporativo | `daniela-saleh.jpg` |
| José Tomás Eyzaguirre Córdova | Litigación Penal Compleja | `jose-tomas-eyzaguirre.jpg` |
| Marlene Molero de Venegas | Niñez y Adolescencia | `marlene-molero.jpg` |

**Card:** Square photo `aspect-square object-cover`, filter `grayscale(100%)`, hover `grayscale(0) scale(1.02)`, transition `400ms ease`. Name: Montserrat SemiBold 600, `#1E1E1E`. Role: Montserrat Light 300, `0.8rem`, `#807662`.

**Link below:** `"Ver perfiles completos → /landing#equipo"` — Montserrat Light 300, `#807662`

---

### S07 — Contacto

**Background:** `#1E1E1E`
**Layout:** `grid grid-cols-2` (desktop), stacked (mobile)

**Left pane:**
- Logo `/logos/ 7.svg` — `140px` wide
- Contact block with left border `2px solid #807662`, `padding-left: 1.5rem`:
  - Address (placeholder — fill from `contact` in `site.ts`)
  - Phone
  - Email
- `"Respondemos en menos de 24 horas hábiles"` — Montserrat Light 300, `0.9rem`, `#C1B7A7`, italic

**Right pane (form):**
- Fields: Nombre / Teléfono / Email / Consulta
- Input style: no background, bottom border only `1px solid #807662`, text `#E0E0E0`, caret `#807662`
- Labels: Montserrat Light 300, `0.75rem`, `#807662`, float above on focus (CSS `peer` technique)
- Submit button: outlined `#C1B7A7`, hover fills `#C1B7A7` text `#1E1E1E`
- Disclaimer below form: Montserrat Light 300, `0.7rem`, `#807662`

**Footer line:** `"© 2026 A un toque legal — Cisternas, Lorenzini & Saleh."` — Montserrat Light 300, `0.7rem`, `#807662`, `position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%)`

---

## 3. Route `/landing` — Static SEO Page

### Head

```html
<title>A un toque legal — Firma de Abogados Santiago, Chile</title>
<meta name="description" content="Cisternas, Lorenzini & Saleh. Firma de abogados en Santiago, Chile. Litigación civil, libre competencia, derecho laboral, familia. Contacto en 24 horas.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://auntoquelegal.cl/landing">
<meta property="og:title" content="A un toque legal — Firma de Abogados Santiago, Chile">
<meta property="og:description" content="Cisternas, Lorenzini & Saleh. Conocimiento jurídico de élite en Santiago, Chile.">
<meta property="og:url" content="https://auntoquelegal.cl/landing">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### JSON-LD (in `<head>`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "A un toque legal — Cisternas, Lorenzini & Saleh",
      "url": "https://auntoquelegal.cl",
      "logo": "https://auntoquelegal.cl/logos/ 6.svg"
    },
    {
      "@type": "LegalService",
      "name": "Cisternas, Lorenzini & Saleh",
      "url": "https://auntoquelegal.cl/landing",
      "telephone": "[phone from site.ts]",
      "email": "[email from site.ts]",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vitacura",
        "addressRegion": "Región Metropolitana",
        "addressCountry": "CL"
      },
      "areaServed": "CL"
    }
  ]
}
```

### Fixed Top Banner

`"← Volver a la experiencia"` linking to `/`. Montserrat Light 300, `0.8rem`, background `#1E1E1E`, text `#C1B7A7`. Fixed top, full width, `height: 40px`, `z-index: 50`.

### Sections

1. **Hero** — H1 with SEO keywords: firm name + city + specialty. Subheadline. Same brand copy.
2. **Diferenciadores** — same 3 cards, standard grid layout.
3. **Cómo Trabajamos** — 5 steps:
   - **Consulta** / Una conversación directa para entender su situación, sin compromiso y sin costo
   - **Diagnóstico** / Análisis claro y propuesta de honorarios por escrito dentro de 24 horas
   - **Estrategia** / Definimos el camino a seguir con hitos concretos y fechas estimadas
   - **Ejecución** / Trabajamos en su caso manteniéndole informado en cada etapa relevante
   - **Seguimiento** / Una vez resuelto su asunto, quedamos disponibles para consultas futuras
4. **Áreas de Práctica** — same 5 areas, each as `<article>` with `<h3>` + full description paragraph.
5. **Clientes** — same 3 testimonials (full text) + client logos (color, no grayscale filter).
6. **Equipo** — full bios with credentials. Each member gets: photo, name (`<h3>`), role, bio paragraph, credentials `<ul>`. Full credential text: `[TODO: full bio from client]`.
7. **Contacto** — same form + contact block.
8. **Footer** — copyright, links.

### Index Route Robots

`index.astro` must include `<meta name="robots" content="noindex, nofollow">`.

---

## 4. Responsive Behavior

### Breakpoints

| Breakpoint | px | Device |
|------------|-----|--------|
| `sm` | 390px | iPhone 14/15 Pro |
| `md` | 768px | iPad Mini/Air |
| `lg` | 1024px | iPad Pro / MacBook Air |
| `xl` | 1280px | MacBook Pro 14" |
| `2xl` | 1536px | MacBook Pro 16" |

### Per-Section Mobile Adaptations

| Section | Desktop | Mobile |
|---------|---------|--------|
| S01 | Logo max 480px | Logo max 280px |
| S02 | Headline 5rem | Headline 2.5rem |
| S03 | 3-column grid | 1-column stacked, `overflow-y: auto` if needed |
| S04 | Row layout, hover descriptions | Touch tap reveals description, compact type |
| S05 | Testimonials 3-col, logos strip | Testimonials stacked, `overflow-y: auto` |
| S06 | 5 cards row flex | Horizontal snap carousel, `data-no-nav` |
| S07 | 50/50 grid | Stacked, form below info |

### Touch Targets
All interactive elements: minimum `44×44px`. CTA buttons, form inputs, team cards.

### iOS Safe Areas
All `.fp-section` elements: `padding-top: env(safe-area-inset-top)`, `padding-bottom: env(safe-area-inset-bottom)`.

---

## 5. Performance Requirements

- `@font-face` all 9 weights with `font-display: swap` — no Google Fonts, no external font requests
- Astro `<Image />` for all photos from `src/assets/` — automatic WebP + lazy loading
- SVG logos used directly via `<img src>` (not inlined — logos are complex)
- Motion One JS loaded only on `/` (inside `<script>` in `index.astro`) — zero JS on `/landing`
- **Targets:** LCP < 2s, CLS = 0
- Preload hint for critical fonts (Montserrat Light + Black) via `<link rel="preload">` in `<head>`

---

## 6. Acceptance Criteria

- [ ] `GET /` returns `<meta name="robots" content="noindex, nofollow">`
- [ ] `GET /landing` returns `<meta name="robots" content="index, follow">` and `canonical` pointing to `/landing`
- [ ] `GET /sitemap.xml` returns XML with only `/landing` URL
- [ ] Zero external HTTP requests for fonts (all Montserrat from `/fonts/`)
- [ ] All 9 Montserrat weights load correctly (verify via DevTools Network tab)
- [ ] Fullpage navigation works: click, ArrowDown/Up, swipe up/down
- [ ] Section counter updates on each transition: `01 / 07` → `02 / 07` etc.
- [ ] Progress bar fills proportionally per section
- [ ] Hint text disappears after 3 seconds on S01
- [ ] Rapid clicks within 800ms do not trigger double transitions
- [ ] S06 mobile: team cards swipe horizontally without triggering vertical section nav
- [ ] All tap targets ≥ 44×44px on mobile
- [ ] No horizontal overflow on any viewport ≥ 390px
- [ ] JSON-LD present in `GET /landing` response `<head>`
- [ ] `astro build` completes with 0 errors
- [ ] `astro check` completes with 0 TypeScript errors

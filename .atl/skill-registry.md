# Skill Registry — auntoquelegal-landing

Generated: 2026-04-11

## Project Context

- **Stack**: Astro 5 + Tailwind CSS v4 + TypeScript
- **Deployment**: Vercel (static adapter)
- **Style**: Premium editorial LegalTech landing page

## User Skills (trigger table)

| Skill | Trigger Context |
|-------|----------------|
| `frontend-design` | Building UI components, pages, web interfaces |
| `branch-pr` | Creating pull requests, preparing branches for review |
| `issue-creation` | Creating GitHub issues, bug reports, feature requests |
| `judgment-day` | Adversarial code/design review before shipping |
| `skill-creator` | Creating new AI agent skills |
| `skill-registry` | Updating this registry |

## SDD Skills (orchestrator-managed)

| Skill | Phase |
|-------|-------|
| `sdd-explore` | Investigation and exploration |
| `sdd-propose` | Change proposal |
| `sdd-spec` | Specification writing |
| `sdd-design` | Technical design |
| `sdd-tasks` | Task breakdown |
| `sdd-apply` | Implementation |
| `sdd-verify` | Verification against specs |
| `sdd-archive` | Archiving completed changes |

## Compact Rules

### frontend-design
- Choose a clear aesthetic direction before coding — for this project: luxury editorial (Bottega Veneta / Weil Gotshal reference)
- Typography: Cormorant Garamond or Playfair Display (serif) for headlines, Inter for body
- Colors: black (#0A0A0A), white (#FAFAFA), single accent warm gold (#B8960C) only for dividers/numerals/CTA borders
- No gradients, no glow effects, no tech iconography
- Generous whitespace — negative space IS the design
- Astro components per section (Hero.astro, Areas.astro, etc.)
- Tailwind utility classes only, no custom CSS files
- Mobile-first responsive: sm(390px) → md(768px) → lg(1024px) → xl(1280px) → 2xl(1536px)
- Image optimization via Astro `<Image />` component
- Smooth scroll + fade-in via Intersection Observer

### branch-pr
- Issue-first: link issue in PR description
- Use conventional commits

### judgment-day
- Trigger: "judgment day", "dual review", "doble review"
- Two blind judges review simultaneously, then synthesize

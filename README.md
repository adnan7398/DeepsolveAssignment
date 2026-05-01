# Pokédex Lite

A web app to browse, search, filter, and favorite the original 151 Pokémon.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build   # production build + type check
npm run lint    # ESLint
```

---

## Features

- **Browse** — Responsive card grid (2 → 5 columns based on viewport) with official artwork, Pokédex number, and type badges
- **Search** — Live filter by name or Pokédex number as you type
- **Type filter** — Multi-select chips for all 18 types; combine with search
- **Pagination** — Prev / Next navigation, 20 Pokémon per page, scrolls to top on page change
- **Favorites** — Heart toggle on every card and in the detail modal; persisted in `localStorage`
- **Detail modal** — Stats (animated fill bars), abilities (hidden ability shown separately), height, weight; close via ✕ button, Escape key, or clicking the backdrop
- **Dark mode** — Toggle in the header; preference is in-session only
- **All states** — Loading skeletons, error with retry, empty search, empty favorites

---

## Technology choices

| Tool | Why |
|---|---|
| **Next.js 16 (App Router)** | Production-grade React framework; SSR-ready, excellent DX, easy Vercel deploy |
| **TypeScript** | Type safety for API responses and component props; catches errors at build time |
| **Tailwind CSS v4** | Utility-first responsive layouts without writing custom breakpoint CSS |
| **PokéAPI** | Free, stable, no auth required; detail endpoint gives sprites, stats, abilities in one call |
| **DM Sans** | Clean geometric sans-serif that fits the card-based design |

---

## Architecture

```
src/
  app/
    page.tsx          — Single Client Component holding all state
    layout.tsx        — DM Sans font, page metadata
    globals.css       — Keyframe animations, responsive grid breakpoints
  components/         — TypeBadge, PokemonCard, SkeletonCard, SearchBar,
                        TypeFilterChips, Pagination, StatBar, Toast, DetailModal
  hooks/
    usePokemonList.ts — Fetches all 151 Gen 1 Pokémon on mount (1 list call + 151 detail calls in parallel)
    useFavorites.ts   — Reads/writes localStorage Set<number>
  lib/
    types.ts          — Pokemon interface
    constants.ts      — TYPE_COLORS, ACCENT (#CC0000), PAGE_SIZE (20)
```

Data loading strategy: Gen 1 (151 Pokémon) is fetched once at startup in parallel. All filtering, search, and pagination are client-side over this dataset. This keeps subsequent interactions instant while still displaying results 20 at a time with proper pagination controls.

---

## Challenges

**Type filtering with paginated data** — PokéAPI's list endpoint returns only names and URLs, no type information. To support type-based filtering across pages, all Pokémon details must be available upfront. The solution was to fetch all 151 Gen 1 details in parallel at mount, which is fast (~1–2s) and enables instant client-side filtering without any additional API calls when the user changes filters.

**Modal animations on unmount** — React unmounts components immediately, so an exit animation needs to delay the `onClose` callback. The DetailModal sets `visible = false` (triggering the CSS transition) then calls `onClose` after 250ms via `setTimeout`, giving the animation time to play.

**Stat bar animation timing** — The bars should be at 0% when the modal first renders, then animate to their actual values. This was solved with a `animateStats` boolean that starts `false` and flips to `true` after a 200ms `requestAnimationFrame` delay, triggering the CSS `width` transition.

---

## Deployment

Deploy to Vercel in one click:

1. Push to GitHub (make repo public)
2. Import at [vercel.com/new](https://vercel.com/new)
3. No environment variables needed — all data is from PokéAPI

Or via CLI: `npx vercel --prod`
# DeepsolveAssignment

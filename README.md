# The Beat List

A cinematic, one-page platform for beat discovery, Nashville Beat Battle,
Nashville Music Boost, community history, and producer submissions.

## Experience

- Scroll-synchronized canvas scenes powered by GSAP ScrollTrigger and Lenis
- Searchable, filterable beat previews with a persistent audio player
- Interactive eight-producer battle bracket saved on the visitor's device
- Documented 2019–2027 program archive and community-impact story
- Embedded Google Form for the next Nashville Beat Battle
- Responsive navigation, keyboard support, and reduced-motion alternatives

All photography and event artwork in this repository comes from The Beat List's
own media archive. Licensing and checkout currently connect to the established
catalog at [TheBeatList.com](https://thebeatlist.com).

## Local development

Requires Node.js 22.13 or newer.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification

```bash
pnpm lint
pnpm build
node --test tests/rendered-html.test.mjs
```

## Main files

- `app/page.tsx` — one-page experience and interactive systems
- `app/globals.css` — visual system and responsive states
- `app/layout.tsx` — metadata and social-sharing configuration
- `public/media/` — approved event imagery

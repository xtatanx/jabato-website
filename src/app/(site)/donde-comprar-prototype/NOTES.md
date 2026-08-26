# PROTOTYPE — Dónde comprar (beer finder) layout

**Throwaway.** Delete this whole folder once the layout question is answered and the
winning variant is folded into the real `/donde-comprar` page (see the "Beer Finder
Donde Comprar" plan).

## Question being answered

Which layout should the beer finder use? Three radically different layouts on one
route, switchable via `?variant=`.

- Run: `pnpm dev`
- Visit: `/donde-comprar-prototype?variant=A` (also `B`, `C`), or use the floating
  switcher pill at the bottom (arrow keys ← / → also cycle). The switcher is hidden
  in production builds.

## Variants

- **A — Split (lista + mapa):** scrollable store list + synced sticky map. Classic
  store-locator (Brewdog / Brooklyn Brewery).
- **B — Mapa inmersivo:** full-bleed map, floating glass search bar, overlaid
  results drawer + floating detail card. App-like.
- **C — Directorio por barrio:** no dominant map; results grouped by neighborhood as
  readable sections, each card with its own static map thumbnail. Most SEO/content
  dense.

## Notes / constraints (real, from the API)

- Data is real: `GET /v1/locations` (19 points, Bogotá + Chía).
- Leaflet is loaded from a CDN here to keep the prototype dependency-free. Production
  will use `react-leaflet` (per plan).
- Filtering + "Cerca de mí" run client-side in memory here; production will call the
  API via a route handler with nuqs params.

## VERDICT

_TBD — pick a winner (or "header from B + cards from C" style mix) and note why here
before deleting the losers._

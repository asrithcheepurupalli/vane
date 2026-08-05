# VANE

**The closure, rethought from a feather.**
A concept study by [made. by ac](https://made-by-ac.com).

A zip has a slider, two tapes and a few hundred teeth that must stay in register.
VANE has none of those. It is a single extruded polymer tape carrying a row of
hooked barbs, copied from the way a bird's feather holds itself together and
repairs itself in one pass of the beak.

---

## The argument

The site is built to carry one argument in five moves.

1. **The incumbent.** Gideon Sundback fixed Whitcomb Judson's clasp locker in
   1913 and the object has not meaningfully changed since. Visitors get a
   working zip they can drag. It jams, every time, at the same place.
2. **The prior art.** A flight feather is a closure that holds against a gale,
   opens without damage and re-links in a single gesture. Velcro came from a
   burr stuck to a dog. Nobody went back for the better idea on the same walk.
3. **The mechanism.** One tape, no slider, no metal, entry at any point.
4. **The asymmetry.** Shear hold is high because that is the only direction a
   garment pulls. Peel release is low because that is the only direction a hand
   pulls. The gap between the two numbers is the entire product.
5. **The material.** A brass zip on a cotton coat makes the coat mixed waste.
   Specify the closure in the shell's own polymer family and the garment
   survives its own end of life.

## Art direction

A natural history plate crossed with a materials lab.

- **Paper and ink.** Bone `#ece8df`, ink `#14130f`, night plates `#100f0c`.
  Alternating light and dark plates pace the scroll.
- **Structural iridescence** is the only colour in the system, and it appears
  only where the barbs have locked. A feather's colour comes from structure
  rather than pigment, so the seam has no colour until it has order. This is
  the one rule the whole palette hangs on.
- **Plate furniture.** Registration ticks in the corners, plate numbering,
  specimen captions, hairline rules.
- **Type.** Instrument Serif for display, Inter Tight for body, JetBrains Mono
  for labels and data.

## The interactions

Everything is hand built with SVG and `requestAnimationFrame`. No animation
library drives the mechanisms.

| Component | What it does |
|---|---|
| `Closure` | The seam. Drag it shut. Closure travels as a wavefront rather than snapping, and the tape edge ripples with it. Iridescence fills in behind the front. |
| `Zip` | The incumbent. A real draggable zip that jams at 62 percent and refuses, with the teeth thrown out of register. |
| `Feather` | Sticky diagram driven by a scroll-linked step rail, four plates from whole vane down to engaged barbules. |
| `Mechanism` | Engage, hold, release, each driving the closure to a state. |
| `Forces` | Drag the pull arm from 0 to 90 degrees and watch hold force collapse from 42 N to 3.1 N along a live curve. |
| `Material` | Two disposal routes, one of which dead ends. |

### Performance notes

Each mechanism owns a rAF loop that **idles when settled and when offscreen**,
so a page carrying five live SVG rigs costs nothing while you read. This was not
optional: without it the main thread starved badly enough to freeze CSS
transitions mid-flight.

## Accessibility

- Every rig is keyboard operable (`role="slider"`, arrow keys, visible focus).
- `prefers-reduced-motion` disables reveals, transitions and animations.
- The nav flips tone over night plates and over the open mobile menu.
- Full stack down at 860px, sticky diagram gives way to one diagram per step.

## Running it

```bash
npm install
npm run dev      # vite, localhost:5173
npm run build    # ~63 kB gzipped js, ~4 kB css
```

## The honest part

This is a concept study, and the site says so in its own colophon rather than
burying it.

The biology is real. A feather vane is held by hooked barbules meeting ridged
ones, and a bird does re-link them in a single pass. The material argument is
real too, and mono-material design is already how the recycling side of the
industry thinks.

Nothing here has been tooled, moulded or pull tested. Every number in the spec
table is a design target we set ourselves, not a result off a rig.

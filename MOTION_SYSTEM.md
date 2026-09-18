# My Grafix Media — Motion System

Architecture reference for the site-wide motion language.
Companion to the design system in `app/globals.css`.

---

## The principle

> Don't animate the website. Animate the ideas behind it.

Every animation must have a reason to move. The site has to look finished in a
static screenshot; motion is what it does when someone actually scrolls.

Motion budget: **80% premium website, 20% cinematic experience.**

---

## 1. Tokens — `lib/motion.ts`

Single source of truth. No component defines its own easing or duration.

| Export | Purpose |
|---|---|
| `EASE` | `out` (entrances), `inOut` (drawing/morphing), `snap` (micro), `linear` |
| `DURATION` | `micro 0.14` · `fast 0.22` · `base 0.45` · `slow 0.75` · `moment 1.1` |
| `STAGGER` | `tight 0.035` · `base 0.07` · `loose 0.12` |
| `DISTANCE` | `xs 6` · `sm 12` · `md 20` · `lg 30` — deliberately small |
| `VIEWPORT` | shared in-view trigger, `once: true`, `-8%` margin |
| `SPRING` | `pointer` (damped, no overshoot), `indicator` (nav underline) |

No bounce. No elastic. Easing is always decelerating.

### Motion hierarchy

| Level | Frequency | Examples |
|---|---|---|
| **1 — micro** | always | hover, focus, borders, button press, index colour |
| **2 — section** | occasional | reveals, image curtains, connector draws, scenario activation |
| **3 — moment** | rare | hero, living-system map |

Level 3 appears exactly twice on the homepage. If everything is spectacular,
nothing is.

---

## 2. Primitives — `components/motion/`

| Primitive | Level | What it does |
|---|---|---|
| `Reveal` | 2 | directional entrance on scroll |
| `RevealGroup` / `RevealItem` | 2 | staggered sequence for related elements |
| `LineReveal` | 3 | display text rising out of its own mask |
| `Magnetic` | 1 | element drifts toward cursor, spring-damped |
| `PointerShift` | 1 | broad-area parallax for artwork/frames |
| `SignalRail` | 2 | hairline that draws, then carries a travelling light |
| `SignalPath` | 2/3 | same idea along an SVG curve |
| `AmbientGrid` | 1 | drifting grid, paused off-screen |
| `PillarVisual` | 2 | design / digital / intelligence behaviours |
| `LivingSystem` | 3 | scenario-cycling system map |
| `MotionProvider` | — | global `MotionConfig reducedMotion="user"` |

---

## 3. The continuity motif

**One motif travels the entire site**, so sections read as one system:

```
hero rail  →  system connector  →  living-system map  →  closing CTA
```

A **hairline that draws itself, then carries a signal.**

Paired with the **node** — a small square that pulses while idle, lights teal
when active. The hero introduces three nodes (DESIGN · DIGITAL · INTELLIGENCE);
the Intelligence section pays it off with six.

The motif is also introduced as a **grid** in the hero that later becomes
structural hairlines in the system diagrams.

---

## 4. Performance rules

- **Transform and opacity only** for anything that repeats. No animated `left`,
  `top`, `width`, or `height`.
- The signal sweep is a `translate + scale` gradient, not a moving dot.
- `AmbientGrid` is oversized by one tile (`inset: -48px`) so drift never
  exposes an edge.
- **Continuous loops are gated on `useInView`** — the grid drift class is only
  applied while its section is on screen.
- **`LivingSystem` runs on one `setInterval`** advancing an integer. All visual
  change is then CSS colour/opacity transition on already-painted elements. No
  per-frame JS. The interval does not exist off-screen.
- **No new dependencies.** `framer-motion@13` already provides everything used.

---

## 5. Accessibility — `prefers-reduced-motion`

Two layers:

1. `MotionConfig reducedMotion="user"` (via `MotionProvider`) — framer-motion
   drops transform/layout animation globally but **keeps opacity**, so state
   changes stay legible.
2. Explicit `useReducedMotion()` checks where there is no opacity fallback —
   decorative loops are **not rendered at all** (no DOM, no CSS animation).

Under reduced motion:

| | Behaviour |
|---|---|
| grid drift | class not applied |
| ambient breathe | `animation: none` |
| node pulse | `animation: none`, static `opacity: .6` |
| signal sweep / flow | not rendered |
| `LivingSystem` | interval never starts; renders the full sequence statically with **no active step** |
| reveals | fade only, no travel |
| page transitions | travel removed, quick fade retained |

**Verified:** `main section` computed opacity is `1` under reduced motion —
reveals never leave content invisible.

---

## 6. Mobile

Mobile is not a smaller desktop. Independently reviewed:

- `Magnetic` / `PointerShift` are **inert on non-mouse pointers** — touch gets
  no cursor effects at all.
- `LivingSystem` node rail is `hidden lg:flex`; the step list becomes the
  primary read, which is the real content.
- One ambient grid per section, never simultaneous.
- Verified: no horizontal overflow at 390px (`scrollWidth === clientWidth`).

---

## 7. Honesty

The living-system map is labelled in the UI:

> *Illustrative system map · a conceptual demonstration of how these components
> fit together, not a live environment*

It demonstrates how the pieces connect. It does not claim a production
integration that does not exist. Do not remove this label.

---

## 8. Verification log

| Check | Result |
|---|---|
| `npm run lint` | 0 problems |
| `npm run build` | passes, 22 routes |
| Route sweep (20 paths) | all 200 |
| Living system advances in view | ✅ 01 → 03 over 3.5s |
| Living system frozen off-screen | ✅ unchanged over 5s |
| Ambient grid pauses off-screen | ✅ `grid-drift` class removed |
| Reduced motion: loops stopped | ✅ breathe/pulse/sweep/flow all off |
| Reduced motion: content visible | ✅ section opacity `1` |
| Mobile 390px overflow | ✅ none |
| Light + dark rendered | ✅ both |
| About line globe rendered | ✅ 8 continent contours + latitude/longitude lines |
| Globe pointer tilt | ✅ desktop hover changes 3D transform and springs back |
| `ZA` graphic removed | ✅ no `ZA` text or old image reference in About |
| Globe auto-rotation loop | ✅ now CSS-composited, pauses on hover and off-screen |
| Representative runtime error probe | ✅ empty error arrays on 8 routes |
| Desktop/tablet/mobile overflow | ✅ no horizontal overflow |

## Animation debugging pass

### Fixed: globe loop was not lifecycle-aware

**Root cause:** the globe used a continuous Framer Motion loop without an
in-view gate, so it kept running after the About section left the viewport.
The pointer interaction also tilted the globe but did not pause its rotation,
despite the component's stated behaviour.

**Smallest fix:** moved the rotation to a CSS transform animation and added
`useInView` plus a hover state. The component now pauses without resetting its
current frame when it is hovered or off-screen. Reduced motion disables it
entirely while leaving the globe visible.

### Audit results

- No `requestAnimationFrame` usage in application motion code.
- The only JavaScript animation loop is the Living System interval; it is
  created only while visible and cleared in the effect cleanup.
- Header scroll and Maya keyboard listeners have matching cleanup functions.
- No raw `IntersectionObserver` instances are duplicated outside Framer Motion.
- Representative runtime error probe returned no errors on `/`, `/about`,
  `/services`, `/work`, `/contact`, `/privacy`, `/terms`, or a case-study route.
- 390px and 768px responsive sweeps reported no horizontal overflow.
- UI project screenshots now switch through the class-based `html.dark` theme variant.
- Utility labels use the existing Geist Sans family; no monospace font is loaded or applied.

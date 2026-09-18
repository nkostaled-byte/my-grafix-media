# FINAL VISUAL FIX — LIVING SYSTEM RAIL / SQUARE NODES

The current implementation is still visually wrong.

After reviewing the actual design, simplify the mental model.

We do NOT need complicated connector routing.

The intended visual is a **continuous grey rail with square nodes sitting directly on top of it**.

---

# THE INTENDED DESIGN

There are six square nodes:
jhj
```text id="q7b7c5"
Website
AI Agent
Business Systems
Automation
Human
Customer
```

They form one horizontal system rail.

The permanent grey connector should run continuously behind the nodes:

```text id="y8b2kz"
───────■────────────■────────────■────────────■────────────■────────────■
       Website      AI Agent     Business     Automation   Human        Customer
```

The squares sit **ON the rail**, not above it with a gap.

The grey line should visually connect directly through the centres of the squares.

However, because the squares are rendered above the rail, the square itself should cover the tiny portion of the line underneath it.

---

# LAYERING

Use this visual hierarchy:

```text id="j4w0k2"
GREY RAIL
    ↓
BLUE ACTIVE RAIL
    ↓
SQUARE NODE
```

The square node should be visually above the connector.

Therefore:

```text id="qg1td5"
───────■────────────■────────────■
```

not:

```text id="3j5wqp"
───────   ■   ─────────   ■   ─────────
```

There should be NO visible gap between the rail and the squares.

---

# THE BLUE SIGNAL

The blue animation should represent the signal travelling **toward the next active square**.

Most importantly:

## THE BLUE SIGNAL MUST STOP AT THE SQUARE.

For example, when moving toward Automation:

```text id="z1vrjv"
───────■────────────■────────────■════════════■
                                      ↑
                                  blue arrives
                                  at square
```

The blue line must terminate at the **edge of the destination square**.

It must NOT continue through the square.

It must NOT continue past the square.

It must NOT appear floating beyond the square.

The destination square should become blue/active as the signal reaches it.

---

# DESTINATION NODE MUST BE THE ENDPOINT

Think of every active transition as:

```text id="8xx5u9"
SOURCE NODE
     ↓
BLUE SIGNAL
     ↓
DESTINATION NODE
     ↓
STOP
```

Never:

```text id="is4b7n"
SOURCE
   ↓
BLUE SIGNAL
   ↓
DESTINATION
   ↓
BLUE CONTINUES
   ↓
NOTHING
```

The blue signal must have a physical endpoint.

---

# IMPORTANT: DO NOT REMOVE THE GREY RAIL

The grey rail is the permanent system infrastructure.

It should remain visible throughout the entire six-node sequence.

The blue animation is an active state layered over that rail.

So conceptually:

```text id="90d5tv"
BASE:
───────■────────────■────────────■────────────■────────────■────────────■

ACTIVE:
───────■────────────■════════════■────────────■────────────■────────────■
                         ↑
                  active segment
```

When the next stage activates, the blue state moves to the appropriate segment.

---

# BLUE MUST NEVER FLOAT

This is the specific visual issue I am seeing.

The blue line currently appears to continue beyond a node and become visually detached/floating.

That must never happen.

The blue segment should have an exact endpoint.

If the destination node is at position X, the blue segment should terminate at the node's boundary.

Do not extend it beyond X.

Do not rely on overflow clipping to hide it.

Calculate the actual segment boundaries correctly.

---

# SQUARE NODE GEOMETRY

The square should be positioned directly over the rail.

For example:

```text id="v4xguh"
───────────────■───────────────
               ↑
             square
               ↑
             rail
```

The rail should pass through the square's centre.

The square itself visually occludes the rail beneath it.

This should make the connection feel physically constructed rather than like separate floating elements.

---

# ACTIVE SQUARE

When the signal reaches a node:

1. Blue signal arrives at the square.
2. The square changes to the active blue state.
3. The square can perform the existing subtle pulse.
4. The blue signal stops at that square.
5. The next transition begins from that node when appropriate.

The square should feel like a **switch/node receiving the signal**.

---

# SPEED — CURRENTLY TOO FAST

The current blue signal animation is too fast.

Slow it down significantly.

The visitor should be able to clearly perceive:

**signal moving → arriving at node → node activating**

Do not make it sluggish, but it should no longer look like a tiny flash racing across the screen.

Target approximately:

**1.4–1.8 seconds per meaningful connector traversal**

rather than the current ~0.8 second animation.

Use the existing motion language/easing.

Do NOT introduce a new animation library.

---

# IMPORTANT: PRESERVE THE EXISTING SCENARIO LOGIC

The scenario data remains the source of truth.

For example:

### Customer

```text id="kq5gh3"
Website → AI Agent
AI Agent → Business Systems
Business Systems → Automation
Automation → Customer
```

The final transition should visually travel toward Customer and stop there.

Human should not become active merely because it sits physically between Automation and Customer.

---

# NON-ADJACENT TRANSITIONS

This is important.

The six-node rail is continuous, but a scenario can skip a node.

For:

```text id="m7t8v1"
Automation → Customer
```

we still have:

```text id="w2q3ka"
Automation ──────────────────────── Customer
```

The blue active state represents that transition.

Human remains a normal/inactive node.

Do NOT turn Human blue.

Do NOT make the signal appear to stop at Human.

---

# DO NOT CREATE A NEW COMPLEX PATH SYSTEM

Please do NOT introduce:

- Bézier routing
- curved paths
- complicated SVG geometry
- canvas
- WebGL
- requestAnimationFrame
- new animation libraries

This visual is fundamentally a **horizontal rail with nodes and active segments**.

Keep the implementation simple.

---

# IMPLEMENTATION GUIDANCE

Inspect the existing `LivingSystem.tsx`.

The current rail is already generated by:

```tsx
{NODES.map((node, index) => {
```

and each connector is currently created between nodes.

Keep that basic structure if possible.

The key changes are:

### 1. Rail alignment

Ensure the connector line is vertically aligned with the centre of the square node.

### 2. Node layering

Give the square node the appropriate stacking context so it visually sits on the rail.

### 3. Active segment bounds

Ensure an active blue segment only occupies the distance between its source and destination node boundaries.

### 4. Endpoint

The blue animation must stop at the destination square.

### 5. Speed

Slow the signal animation to approximately 1.4–1.8 seconds.

### 6. Active node timing

The destination node should become active when the signal arrives rather than appearing active long before the signal reaches it.

---

# CRITICAL: DO NOT MASK THE PROBLEM

Do NOT use:

- overflow hidden
- clipping
- masks
- black backgrounds
- z-index to hide a wrongly positioned blue line
- arbitrary negative margins
- extending the node over the line
- shrinking the viewport/container to hide the endpoint

The blue line must genuinely end at the destination node.

Z-index IS appropriate for putting the square visually above the rail, but it must not be used to hide an incorrectly sized blue segment.

---

# VISUAL TARGET

The final rail should feel like this:

```text id="8g9j1x"
          Website       AI Agent      Business      Automation      Human      Customer

             ■────────────■────────────■────────────■────────────■────────────■
```

And when Automation is active:

```text id="x0c7p3"
             ■────────────■────────────■════════════■────────────■────────────■
                                      BLUE SIGNAL → ■
                                                    STOP
```

The blue line terminates at the square.

Then when Customer becomes the destination:

```text id="z8x6bc"
             ■────────────■────────────■────────────■────────────■────────────■
                                      Automation ═══════════════════════════════■
                                                                            Customer
                                                                            STOP
```

The line stops at Customer.

There should be nothing blue beyond Customer.

---

# TEST THESE SPECIFIC CASES

## Case 1 — Adjacent

```text
Automation → Human
```

Blue travels to Human and stops exactly at Human.

## Case 2 — Non-adjacent

```text
Automation → Customer
```

Blue travels toward Customer without activating Human and stops exactly at Customer.

## Case 3 — Final endpoint

```text
Human → Customer
```

Blue reaches Customer and stops.

Nothing continues beyond Customer.

## Case 4 — Website → Business Systems

Blue should represent the transition without incorrectly activating AI Agent.

---

# FINAL QUALITY BAR

When I look at the rail I should immediately understand:

**Grey = system structure**

**Blue = active signal**

**Square = system node**

**Blue arrives at square = node activated**

The animation should feel calm, precise and intentional.

It should NOT feel like a line sliding underneath floating squares.

It should NOT feel like the blue line is escaping past the destination.

It should feel like the signal is physically travelling through a system of connected nodes.

---

Before finishing, inspect the rendered result specifically at the **Customer** endpoint and confirm:

```text
Human ───────────── Customer ■
                         ↑
                    BLUE STOPS
```

There must be no blue line after the Customer square.

Also verify the animation speed visually. The signal should be slow enough to understand, approximately 1.4–1.8 seconds per meaningful traversal.

Do not declare success based only on TypeScript/build passing. The geometry and animation behaviour are the actual acceptance criteria.
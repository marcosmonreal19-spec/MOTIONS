# AMOS_Peelerz_E01 — continuous product journey

1080 × 1920 · 30 fps · 255 frames / 8.5 seconds.
Studio ID: `AMOS-Peelerz-E01` (Remotion does not support underscores in IDs).

## Architecture

There is one persistent 5000 × 5600 world, not a timeline of separate scenes.
`World.tsx` composes its persistent planes; `CameraRig.tsx` projects world
coordinates through one camera path. No scene mounts, layout switches, scene
crossfades, rectangular wipes or camera resets are used.

- `timeline.ts`: editable narrative copy, palette, camera and gummy waypoints.
  Non-uniform cubic Hermite tracks share derivatives between segments, so
  camera position, zoom, rotation and velocity remain continuous.
- `BackgroundWorld.tsx`: oversized luminous background, 0.25× camera travel,
  plus one peach organic surface that follows the journey and becomes the
  packaging backdrop on its own 0.85× plane.
- `Typography.tsx`: Poppins only, 0.65× camera travel. Main copy enters through
  distinct mask, directional, tracking/punch, stagger and outline-to-fill
  treatments with frame-driven cubic easing. PÉLALA. has a complete, unmasked
  outline base, one fill mask and one offset shadow, all behind the product.
  Only filled hook accents occupy the foreground; strokes never overlay PNGs.
- `ProductLayer.tsx`: 1× camera travel. The pack is already in the world; camera
  tracking discovers it. The peeled gummy guides the camera toward it.
- `PeelRibbon.tsx`: persistent world-space trajectory and a 1.3× foreground
  ribbon. It approaches the lens, covers it and recedes during the peel event.
  Whole-to-peeled substitution happens at 2.4 seconds, inside full lens coverage.
  It begins as the underline of PELAR?, grows into the journey curve and then
  crosses the lens. The same motif closes the yellow-to-yellow loop.

## Narrative timing

0–1.3: macro dolly-out / hook; 1.3–2.8: camera follows the peel curve;
2.8–4.4: peeled macro, discovery and action; 4.4–6.5: journey to the stationary
pack; 6.5–8.5: hero pull-out, CTA, foreground ribbon and loop.

These are narrative windows on the same timeline, not independent scenes.

A 0.65-second dynamic hero hold (6.6–7.25s) slows the camera clock without
freezing it. Supporting graphic planes use less than one degree of perspective;
products and the foreground lens crossing remain strictly planar. Entry, build,
interaction, emphasis and handoff share the ribbon and organic-surface motifs.

## Font and assets

Poppins is loaded with the public `loadFont` API from
`@remotion/google-fonts/Poppins`, using the normal style, weights 500–900
and the Latin subset. No fallback font family is authored.

Only the three original product PNGs are used. `Product` compensates for their
transparent padding while retaining the full image, original aspect ratio,
colors and details. Scale is always proportional. Shadows add depth without
recoloring the product. `MOTIONS-Vertical` remains independent and unchanged.

Preview: `npm run dev -- --no-open`, select `AMOS-Peelerz-E01`, press Play.
Validation: `npm run lint` (ESLint and TypeScript). No MP4 is required.

# AMOS_Peelerz_E01 — continuous product journey

1080 × 1920 · 30 fps · 255 frames / 8.5 seconds.
Studio ID: `AMOS-Peelerz-E01` (Remotion does not support underscores in IDs).

## Architecture

There is one persistent 5000 × 5600 world, not a timeline of separate scenes.
`World.tsx` composes its persistent planes; `CameraRig.tsx` projects world
coordinates through one camera path. No scene mounts, layout switches, fades,
rectangular wipes or camera resets are used.

- `timeline.ts`: editable narrative copy, palette, camera and gummy waypoints.
  Non-uniform cubic Hermite tracks share derivatives between segments, so
  camera position, zoom, rotation and velocity remain continuous.
- `BackgroundWorld.tsx`: oversized luminous background, 0.25× camera travel.
- `Typography.tsx`: Poppins only, 0.65× camera travel. Main copy enters through
  frame-driven spring masks and leaves physically through the moving world.
  Foreground letter fragments cross the product for actual interleaved layering.
- `ProductLayer.tsx`: 1× camera travel. The pack is already in the world; camera
  tracking discovers it. The peeled gummy guides the camera toward it.
- `PeelRibbon.tsx`: persistent world-space trajectory and a 1.3× foreground
  ribbon. It approaches the lens, covers it and recedes during the peel event.
  Whole-to-peeled substitution happens at 2.4 seconds, inside full lens coverage.
  The same ribbon closes the lens for the yellow-to-yellow loop.

## Narrative timing

0–1.3: macro dolly-out / hook; 1.3–2.8: camera follows the peel curve;
2.8–4.4: peeled macro, discovery and action; 4.4–6.5: journey to the stationary
pack; 6.5–8.5: hero pull-out, CTA, foreground ribbon and loop.

These are narrative windows on the same timeline, not independent scenes.

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

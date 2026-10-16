# AMOS_Peelerz_E01

Performance candy motion, 1080 × 1920, 30 fps, 240 frames.
Remotion Studio ID: `AMOS-Peelerz-E01` (Remotion disallows underscores in IDs).

## Edit

- `shared.tsx`: `COPY`, palette `C`, original PNG geometry and reusable graphics.
- `Scene1.tsx`–`Scene5.tsx`: independently authored scene layouts and motion.
- `index.tsx`: named `Sequence` timeline, curved scene covers and exact opening-frame loop.

| Scene           | Seconds | Frames (inclusive) |
| --------------- | ------- | ------------------ |
| Hook            | 0–1.4   | 0–41               |
| Peel transition | 1.4–3   | 42–89              |
| Pélala          | 3–4.6   | 90–137             |
| Pack reveal     | 4.6–6.6 | 138–197            |
| End card / loop | 6.6–8   | 198–239            |

## Graphic system

`AnimatedGradientBackground`, `GraphicBlob`, `PeelRibbon`, `KineticWord`,
`ProductShadow`, `MotionTrail`, `RadialBurst`, `FloatingShape`, `EditorialMark`
and `SceneTransition` are built from React, CSS and SVG. All motion is driven
by the Remotion frame clock, springs and custom easing. Grain uses a fixed SVG
noise seed; no random particles or external graphic assets are used.

Scene 2 shares a circular boundary between complementary masks and the visible
peel arc. It substitutes the exact whole and peeled PNGs without morphing them.
Scene 3's offset monochrome silhouette is an explicitly graphical motion shadow.
The last curved cover reveals `Scene1` frozen at frame 0, matching the first frame.

`Product` offsets transparent source padding without clipping or changing the
PNG. Uniform scale and rotation preserve proportions, color and packaging.
Only the three original files under `public/amos/peelerz banana/` are loaded.
`MOTIONS-Vertical` is independent and unchanged.

Preview with `npm run dev -- --no-open`, then select `AMOS-Peelerz-E01`.
`npm run lint` runs ESLint and TypeScript. No MP4 is required for review.

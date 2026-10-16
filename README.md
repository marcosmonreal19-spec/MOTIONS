# MOTIONS — Remotion Lab

Workspace privado para crear y versionar motion graphics con Remotion.

## Starter composition

- ID: `MOTIONS-Vertical`
- Resolution: `1080x1920`
- FPS: `30`
- Duration: `15 s` / `450 frames`

## Local setup

```bash
npm install
npm run dev
```

Remotion Studio abrirá el preview del proyecto.

## Render MP4

```bash
npm run render
```

Salida:

```text
out/motions-vertical.mp4
```

## Useful commands

```bash
npm run dev
npm run lint
npm run render
npm run upgrade
```

## Project structure

```text
src/
  index.ts
  Root.tsx
  Video.tsx
```

`Root.tsx` registra las composiciones y sus formatos. `Video.tsx` contiene la composición starter actual.

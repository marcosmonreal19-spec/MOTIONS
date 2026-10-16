import type { CSSProperties, ReactNode } from "react";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C,
  COPY,
  ease,
  getCamera,
  GUMMY,
  ORIGIN,
  sampleTrack,
  WORLD,
} from "./timeline";

export const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type WordProps = {
  text: string;
  x: number;
  y: number;
  size: number;
  weight: 500 | 600 | 700 | 800 | 900;
  start: number;
  color?: string;
  style?: CSSProperties;
  foreground?: boolean;
  productReveal?: boolean;
  cleanEntry?: boolean;
};
const Word = ({
  text,
  x,
  y,
  size,
  weight,
  start,
  color = C.green,
  style,
  foreground = false,
  productReveal = false,
  cleanEntry = false,
}: WordProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame: frame - start * fps,
    fps,
    config: { damping: 23, stiffness: 150, mass: 0.8 },
  });
  return (
    <div
      aria-hidden={foreground || undefined}
      style={{
        position: "absolute",
        left: x,
        top: y,
        overflow: "hidden",
        padding: "6px 14px 20px 0",
        opacity: cleanEntry
          ? interpolate(
              frame,
              [start * fps, (start + 0.12) * fps],
              [0, 1],
              ease,
            )
          : undefined,
        clipPath: foreground
          ? text === COPY.action
            ? "inset(0 0 0 55%)"
            : "inset(0 0 0 35%)"
          : undefined,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: size,
          fontWeight: weight,
          lineHeight: 1.03,
          letterSpacing: "-0.055em",
          whiteSpace: "nowrap",
          translate:
            productReveal || cleanEntry
              ? undefined
              : `0 ${interpolate(reveal, [0, 1], [118, 0])}%`,
          transformOrigin: "0 100%",
          scale: interpolate(
            reveal,
            [0, 1],
            [productReveal || cleanEntry ? 0.99 : 0.94, 1],
          ),
        }}
      >
        <span style={{ color }}>{text}</span>
      </div>
    </div>
  );
};

// Reveal originates at the tracked gummy tip, in the typography plane's
// coordinates. Both letter planes share this mask; no vertical glyph slivers.
const ProductTypeReveal = ({ children }: { children: ReactNode }) => {
  const { fps } = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const camera = getCamera(t);
  const gummy = sampleTrack(t, GUMMY);
  const x = gummy.x - 340 * gummy.scale - (camera.x - ORIGIN.x) * 0.35;
  const y = gummy.y - 300 * gummy.scale - (camera.y - ORIGIN.y) * 0.35;
  const radius = interpolate(t, [3.4, 3.8], [0, 1200], ease);
  return (
    <div
      style={{
        position: "absolute",
        width: WORLD.width,
        height: WORLD.height,
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Typography = ({
  foreground = false,
}: {
  foreground?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const hookTravel = interpolate(t, [1.3, 2.5], [0, -400], ease);
  const camera = getCamera(t);
  const safeScale = Math.min(1, 1.12 / camera.scale);
  const angle = (-camera.rotation * Math.PI) / 180;
  const cx = ORIGIN.x + (camera.x - ORIGIN.x) * 0.65;
  const cy = ORIGIN.y + (camera.y - ORIGIN.y) * 0.65;
  const anchorX = 950 + hookTravel;
  const anchorY = 880;
  const corners = [
    [0, 0],
    [620 * safeScale, 0],
    [0, 80 * safeScale],
    [620 * safeScale, 80 * safeScale],
  ].map(([dx, dy]) => ({
    x:
      540 +
      camera.scale *
        ((anchorX + dx - cx) * Math.cos(angle) -
          (anchorY + dy - cy) * Math.sin(angle)),
    y:
      960 +
      camera.scale *
        ((anchorX + dx - cx) * Math.sin(angle) +
          (anchorY + dy - cy) * Math.cos(angle)),
  }));
  const moveX =
    Math.max(0, 88 - Math.min(...corners.map((p) => p.x))) +
    Math.min(0, 992 - Math.max(...corners.map((p) => p.x)));
  const moveY = Math.max(0, 160 - Math.min(...corners.map((p) => p.y)));
  const safeHold = interpolate(t, [1.3, 1.55], [1, 0], ease);
  const safeX =
    (moveX * Math.cos(angle) + moveY * Math.sin(angle)) / camera.scale;
  const safeY =
    (-moveX * Math.sin(angle) + moveY * Math.cos(angle)) / camera.scale;
  // Keep the existing CTA grouping intact while the pack hero slows the camera.
  // Only compensate where the viewport would otherwise clip its top/left edge.
  const ctaCorners = [
    [1940, 1815],
    [2760, 1815],
    [1940, 2180],
    [2760, 2180],
  ].map(([px, py]) => ({
    x:
      540 +
      camera.scale *
        ((px - cx) * Math.cos(angle) - (py - cy) * Math.sin(angle)),
    y:
      960 +
      camera.scale *
        ((px - cx) * Math.sin(angle) + (py - cy) * Math.cos(angle)),
  }));
  const ctaMoveX =
    Math.max(0, 88 - Math.min(...ctaCorners.map((p) => p.x))) +
    Math.min(0, 992 - Math.max(...ctaCorners.map((p) => p.x)));
  const ctaMoveY = Math.max(0, 120 - Math.min(...ctaCorners.map((p) => p.y)));
  const ctaX =
    (ctaMoveX * Math.cos(angle) + ctaMoveY * Math.sin(angle)) / camera.scale;
  const ctaY =
    (-ctaMoveX * Math.sin(angle) + ctaMoveY * Math.cos(angle)) / camera.scale;
  const actionTravel = interpolate(t, [4.4, 5.12], [0, -1400], ease);
  const discoveryTravel = interpolate(t, [3.38, 3.88], [0, -1100], ease);
  const packTravel = interpolate(t, [6.38, 6.93], [0, -1300], ease);
  return (
    <>
      <div style={{ visibility: t >= 2.4 ? "hidden" : undefined }}>
        {!foreground && (
          <Word
            text={COPY.hook[0]}
            x={950 + hookTravel + safeX * safeHold}
            y={880 + safeY * safeHold}
            size={50}
            weight={500}
            start={-0.16}
            style={{ scale: safeScale, transformOrigin: "0 0" }}
            color={C.ink}
          />
        )}
        {!foreground && (
          <Word
            text={COPY.hook[1]}
            x={900 + hookTravel}
            y={1080}
            size={70}
            weight={600}
            start={0.18}
          />
        )}
        <Word
          text={COPY.hook[2]}
          x={900 + hookTravel}
          y={1190}
          size={140}
          weight={700}
          start={0.25}
          foreground={foreground}
        />
        <Word
          text={COPY.hook[3]}
          x={900 + hookTravel}
          y={1360}
          size={160}
          weight={900}
          start={0.33}
          color={C.ink}
          foreground={foreground}
        />
      </div>
      {!foreground && (
        <>
          <Word
            text={COPY.discovery[0]}
            x={1400}
            y={1560 + discoveryTravel}
            size={65}
            weight={600}
            start={2.55}
          />
          <Word
            text={COPY.discovery[1]}
            x={1370}
            y={1660 + discoveryTravel}
            size={125}
            weight={800}
            start={2.62}
          />
        </>
      )}
      <ProductTypeReveal>
        <Word
          text={COPY.action}
          x={1450 + actionTravel}
          y={1900}
          size={170}
          weight={900}
          start={3.44}
          color={C.ink}
          foreground={foreground}
          productReveal
        />
      </ProductTypeReveal>
      {!foreground && (
        <>
          <Word
            text={COPY.pack[0]}
            x={2070}
            y={1960 + packTravel}
            size={70}
            weight={600}
            start={5.2}
          />
          <Word
            text={COPY.pack[1]}
            x={2020}
            y={2060 + packTravel}
            size={150}
            weight={900}
            start={5.3}
          />
          <Word
            text={COPY.closing[0]}
            x={1940 + ctaX}
            y={1815 + ctaY}
            size={78}
            weight={600}
            start={6.65}
            cleanEntry
          />
          <Word
            text={COPY.closing[1]}
            x={1940 + ctaX}
            y={1950 + ctaY}
            size={170}
            weight={900}
            start={6.78}
            cleanEntry
          />
        </>
      )}
    </>
  );
};

import type { CSSProperties } from "react";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C,
  COPY,
  ease,
  getCamera,
  GUMMY,
  hookTravel,
  ORIGIN,
  sampleTrack,
} from "./timeline";

export const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

type TypeVariant =
  | "mask"
  | "slide"
  | "tracking"
  | "outline-fill"
  | "stagger"
  | "action"
  | "outline"
  | "banana"
  | "cta";
type TypeProps = {
  text: string;
  x: number;
  y: number;
  size: number;
  weight: 500 | 600 | 700 | 800 | 900;
  start: number;
  variant: TypeVariant;
  color?: string;
  foreground?: boolean;
  exit?: [number, number];
  style?: CSSProperties;
};

// Whole glyphs remain geometrically intact. Only explicit entry/fill containers
// receive masks. The action's outline base is never masked or split.
const GlyphRun = ({
  text,
  time,
  start,
  stagger,
  style,
}: {
  text: string;
  time: number;
  start: number;
  stagger: boolean;
  style: CSSProperties;
}) => (
  <span style={style}>
    {stagger
      ? [...text].map((letter, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: interpolate(
                time,
                [start + i * 0.018, start + i * 0.018 + 0.14],
                [0, 1],
                ease,
              ),
              translate: `0 ${interpolate(time, [start + i * 0.018, start + i * 0.018 + 0.22], [18, 0], ease)}px`,
            }}
          >
            {letter}
          </span>
        ))
      : text}
  </span>
);

const KineticType = ({
  text,
  x,
  y,
  size,
  weight,
  start,
  variant,
  color = C.green,
  foreground = false,
  exit,
  style,
}: TypeProps) => {
  const { fps } = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const camera = getCamera(t);
  const age = t - start;
  const entry = interpolate(
    t,
    [start, start + (variant === "action" ? 0.12 : 0.18)],
    [0, 1],
    ease,
  );
  const departure = exit ? interpolate(t, exit, [1, 0], ease) : 1;
  const isPunch =
    variant === "tracking" || variant === "banana" || variant === "cta";
  const tracking =
    variant === "tracking" || variant === "cta"
      ? interpolate(age, [0, 0.38], [0.055, -0.055], ease)
      : variant === "banana"
        ? interpolate(age, [0, 0.32], [0.01, -0.02], ease)
        : -0.055;
  const scale = isPunch
    ? interpolate(
        age,
        [0, 0.22, 0.44],
        [
          variant === "banana" ? 0.96 : 0.94,
          variant === "banana" ? 1.01 : 1.03,
          1,
        ],
        ease,
      )
    : 1;
  const isMask =
    variant === "mask" || variant === "slide" || variant === "outline";
  const outlineFill = variant === "outline-fill" || variant === "action";
  const secondary = variant === "stagger" || variant === "cta";
  const fillBuild =
    variant === "action"
      ? interpolate(t, [3.57, 4.03], [0, 1], ease)
      : interpolate(age, [0.2, 0.68], [0, 1], ease);
  const stroke =
    (variant === "action"
      ? interpolate(t, [3.65, 4.08], [4.8, 1.3], ease)
      : variant === "outline-fill"
        ? 4.5
        : 2.6) / camera.scale;
  const base: CSSProperties = {
    display: "block",
    fontFamily,
    fontSize: size,
    fontWeight: weight,
    lineHeight: 1.12,
    letterSpacing: `${tracking}em`,
    whiteSpace: "pre",
  };
  const gummy = sampleTrack(t, GUMMY);
  const fillOriginX =
    gummy.x - 340 * gummy.scale - (camera.x - ORIGIN.x) * 0.35 - x;
  const fillOriginY =
    gummy.y - 300 * gummy.scale - (camera.y - ORIGIN.y) * 0.35 - y;
  const fillMask =
    variant === "action"
      ? `circle(${fillBuild * 1300}px at ${fillOriginX}px ${fillOriginY}px)`
      : `polygon(0 0, ${fillBuild * 108}% 0, ${Math.max(0, fillBuild * 108 - 8)}% 100%, 0 100%)`;
  const shadow = variant === "action" || variant === "banana";
  const shadowX = (10 + camera.rotation * 0.45) / camera.scale;
  const shadowY = 14 / camera.scale;
  // Foreground is a filled accent for the hook only; strokes never paint over
  // the PNG. PÉLALA has no foreground duplicate and no inset(55%) behavior.
  if (foreground && variant !== "tracking" && variant !== "outline-fill")
    return null;
  return (
    <div
      data-type={text}
      data-variant={variant}
      data-type-plane={foreground ? "front" : "back"}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "max-content",
        opacity: entry * departure,
        scale,
        translate: `${isMask ? interpolate(age, [0, 0.22], [variant === "slide" ? 30 : 42, 0], ease) : 0}px 0`,
        transformOrigin: "0 100%",
        ...style,
      }}
    >
      <div
        style={{
          clipPath: foreground
            ? "inset(0 0 0 35%)"
            : isMask
              ? `inset(0 ${(1 - entry) * 100}% 0 -8px)`
              : undefined,
          overflow: "visible",
        }}
      >
        {!foreground && shadow && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: shadowX,
              top: shadowY,
              opacity: (variant === "action" ? fillBuild : entry) * 0.11,
            }}
          >
            <GlyphRun
              text={text}
              time={t}
              start={start}
              stagger={false}
              style={{ ...base, color: C.green }}
            />
          </div>
        )}
        {!foreground && secondary && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 9 / camera.scale,
              top: 9 / camera.scale,
              opacity: interpolate(
                t,
                [start + 2 / fps, start + 2 / fps + 0.16],
                [0, 0.8],
                ease,
              ),
            }}
          >
            <GlyphRun
              text={text}
              time={t}
              start={start + 2 / fps}
              stagger={variant === "stagger"}
              style={{
                ...base,
                color: "transparent",
                WebkitTextStroke: `${3 / camera.scale}px ${C.cream}`,
              }}
            />
          </div>
        )}
        {outlineFill && !foreground ? (
          <>
            <GlyphRun
              text={text}
              time={t}
              start={start}
              stagger={false}
              style={{
                ...base,
                color: "transparent",
                WebkitTextStroke: `${stroke}px ${color}`,
              }}
            />
            <div
              data-type-fill-mask
              style={{ position: "absolute", inset: 0, clipPath: fillMask }}
            >
              <GlyphRun
                text={text}
                time={t}
                start={start}
                stagger={false}
                style={{
                  ...base,
                  color: variant === "outline-fill" ? C.cream : color,
                }}
              />
            </div>
          </>
        ) : (
          <GlyphRun
            text={text}
            time={t}
            start={start}
            stagger={variant === "stagger"}
            style={{
              ...base,
              color:
                variant === "outline"
                  ? "transparent"
                  : variant === "outline-fill"
                    ? C.cream
                    : color,
              WebkitTextStroke:
                variant === "outline" ? `${stroke}px ${color}` : undefined,
              opacity: foreground && variant === "outline-fill" ? fillBuild : 1,
            }}
          />
        )}
      </div>
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
  const travel = hookTravel(t);
  const camera = getCamera(t);
  const safeScale = Math.min(1, 1.12 / camera.scale);
  const angle = (-camera.rotation * Math.PI) / 180;
  const cx = ORIGIN.x + (camera.x - ORIGIN.x) * 0.65;
  const cy = ORIGIN.y + (camera.y - ORIGIN.y) * 0.65;
  const anchorX = 950 + travel;
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
  const hookZoom = Math.min(1, 1.22 / camera.scale);
  const hookCorners = [
    [0, 0],
    [720 * hookZoom, 0],
    [0, 490 * hookZoom],
    [720 * hookZoom, 490 * hookZoom],
  ].map(([dx, dy]) => ({
    x:
      540 +
      camera.scale *
        ((900 + travel + dx - cx) * Math.cos(angle) -
          (1080 + dy - cy) * Math.sin(angle)),
    y:
      960 +
      camera.scale *
        ((900 + travel + dx - cx) * Math.sin(angle) +
          (1080 + dy - cy) * Math.cos(angle)),
  }));
  const hookMoveX =
    Math.max(0, 88 - Math.min(...hookCorners.map((p) => p.x))) +
    Math.min(0, 992 - Math.max(...hookCorners.map((p) => p.x)));
  const hookMoveY = Math.max(0, 290 - Math.min(...hookCorners.map((p) => p.y)));
  const hookX =
    (hookMoveX * Math.cos(angle) + hookMoveY * Math.sin(angle)) / camera.scale;
  const hookY =
    (-hookMoveX * Math.sin(angle) + hookMoveY * Math.cos(angle)) / camera.scale;
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

  const actionCorners = [
    [1450, 1700],
    [2140, 1700],
    [1450, 1910],
    [2140, 1910],
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
  const actionMoveX =
    Math.max(0, 88 - Math.min(...actionCorners.map((p) => p.x))) +
    Math.min(0, 992 - Math.max(...actionCorners.map((p) => p.x)));
  const actionMoveY = Math.max(
    0,
    140 - Math.min(...actionCorners.map((p) => p.y)),
  );
  const actionX =
    (actionMoveX * Math.cos(angle) + actionMoveY * Math.sin(angle)) /
    camera.scale;
  const actionY =
    (-actionMoveX * Math.sin(angle) + actionMoveY * Math.cos(angle)) /
    camera.scale;
  const actionSafeHold = interpolate(t, [4.45, 4.85], [1, 0], ease);
  const actionExit = interpolate(t, [4.4, 4.85], [0, -64], ease);
  const discoveryExit = interpolate(t, [3.23, 3.4], [0, -48], ease);
  const packExit = interpolate(t, [6.35, 6.58], [0, -45], ease);
  return (
    <>
      <div style={{ visibility: t >= 2.4 ? "hidden" : undefined }}>
        {!foreground && (
          <KineticType
            text={COPY.hook[0]}
            x={950 + travel + safeX * safeHold}
            y={880 + safeY * safeHold}
            size={50}
            weight={500}
            start={-0.16}
            variant="mask"
            style={{ scale: safeScale, transformOrigin: "0 0" }}
            color={C.ink}
          />
        )}
        <div
          style={{
            position: "absolute",
            left: 900 + travel + hookX * safeHold,
            top: 1080 + hookY * safeHold,
            scale: hookZoom,
            transformOrigin: "0 0",
          }}
        >
          {!foreground && (
            <KineticType
              text={COPY.hook[1]}
              x={0}
              y={0}
              size={70}
              weight={600}
              start={0.18}
              variant="slide"
            />
          )}
          <KineticType
            text={COPY.hook[2]}
            x={0}
            y={110}
            size={140}
            weight={700}
            start={0.25}
            variant="tracking"
            foreground={foreground}
          />
          <KineticType
            text={COPY.hook[3]}
            x={0}
            y={280}
            size={160}
            weight={900}
            start={0.33}
            variant="outline-fill"
            foreground={foreground}
          />
        </div>
      </div>
      {!foreground && (
        <>
          <KineticType
            text={COPY.discovery[0]}
            x={1400}
            y={1560 + discoveryExit}
            size={65}
            weight={600}
            start={2.55}
            variant="mask"
            exit={[3.23, 3.4]}
          />
          <KineticType
            text={COPY.discovery[1]}
            x={1370}
            y={1660 + discoveryExit}
            size={125}
            weight={800}
            start={2.62}
            variant="stagger"
            exit={[3.23, 3.4]}
          />
          <KineticType
            text={COPY.action}
            x={1450 + actionExit + actionX * actionSafeHold}
            y={1700 + actionY * actionSafeHold}
            size={170}
            weight={900}
            start={3.42}
            variant="action"
            color={C.ink}
            exit={[4.45, 4.85]}
          />
          <KineticType
            text={COPY.pack[0]}
            x={2070}
            y={1960 + packExit}
            size={70}
            weight={600}
            start={5.2}
            variant="outline"
            exit={[6.35, 6.58]}
          />
          <KineticType
            text={COPY.pack[1]}
            x={2020}
            y={2060 + packExit}
            size={150}
            weight={900}
            start={5.3}
            variant="banana"
            exit={[6.35, 6.58]}
          />
          <KineticType
            text={COPY.closing[0]}
            x={1940 + ctaX}
            y={1815 + ctaY}
            size={78}
            weight={600}
            start={6.65}
            variant="outline"
          />
          <KineticType
            text={COPY.closing[1]}
            x={1940 + ctaX}
            y={1950 + ctaY}
            size={170}
            weight={900}
            start={6.78}
            variant="cta"
          />
        </>
      )}
    </>
  );
};

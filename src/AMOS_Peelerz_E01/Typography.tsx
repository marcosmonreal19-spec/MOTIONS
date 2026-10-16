import type { CSSProperties } from "react";
import { loadFontFromInfo } from "@remotion/google-fonts/from-info";
import { getInfo } from "@remotion/google-fonts/Poppins";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, COPY, ease } from "./timeline";

// Poppins metadata comes from the requested Remotion font module. The same
// licensed Google Font is served locally so preview never depends on a CDN.
const info = getInfo();
for (const weight of ["500", "600", "700", "800", "900"] as const) {
  info.fonts.normal[weight].latin = staticFile(
    `fonts/poppins/poppins-latin-${weight}-normal.woff2`,
  );
}
export const { fontFamily } = loadFontFromInfo(info, "normal", {
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
          translate: `0 ${interpolate(reveal, [0, 1], [118, 0])}%`,
          transformOrigin: "0 100%",
          scale: interpolate(reveal, [0, 1], [0.94, 1]),
        }}
      >
        <span style={{ color }}>{text}</span>
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
  const hookTravel = interpolate(t, [1.3, 2.5], [0, -1000], ease);
  const actionTravel = interpolate(t, [4.4, 5.12], [0, -1400], ease);
  const discoveryTravel = interpolate(t, [3.38, 3.88], [0, -1100], ease);
  const packTravel = interpolate(t, [6.38, 6.93], [0, -1300], ease);
  return (
    <>
      {!foreground && (
        <Word
          text={COPY.hook[0]}
          x={950 + hookTravel}
          y={880}
          size={42}
          weight={500}
          start={0.08}
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
      {!foreground && (
        <>
          <Word
            text={COPY.discovery[0]}
            x={1400}
            y={1560 + discoveryTravel}
            size={65}
            weight={600}
            start={2.68}
          />
          <Word
            text={COPY.discovery[1]}
            x={1370}
            y={1660 + discoveryTravel}
            size={125}
            weight={800}
            start={2.78}
          />
        </>
      )}
      <Word
        text={COPY.action}
        x={1450 + actionTravel}
        y={1900}
        size={170}
        weight={900}
        start={3.48}
        color={C.ink}
        foreground={foreground}
      />
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
            x={1940}
            y={1815}
            size={78}
            weight={600}
            start={6.65}
          />
          <Word
            text={COPY.closing[1]}
            x={1940}
            y={1950}
            size={170}
            weight={900}
            start={6.78}
          />
        </>
      )}
    </>
  );
};

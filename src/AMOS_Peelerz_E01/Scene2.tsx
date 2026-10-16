import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  C,
  COPY,
  ease,
  EditorialMark,
  FloatingShape,
  GraphicBlob,
  KineticWord,
  Product,
  ProductShadow,
  Stage,
} from "./shared";

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const radius = interpolate(frame, [0.12 * fps, 1.18 * fps], [0, 2400], ease);
  const mask = `radial-gradient(circle at -180px 1200px, transparent ${radius}px, black ${radius + 1}px)`;
  return (
    <Stage tone="peach">
      <GraphicBlob x={-500} y={-450} size={1450} color={C.cream} />
      <GraphicBlob x={400} y={1100} size={1000} color={C.banana} />
      <AbsoluteFill style={{ background: C.banana, maskImage: mask }} />
      <EditorialMark number="02" label="THE PEEL MOMENT" />
      <KineticWord
        x={80}
        y={270}
        size={78}
        style={{
          translate: `${interpolate(frame, [0, 0.5 * fps], [-150, 0], ease)}px 0`,
        }}
      >
        {COPY.peel[0]}
      </KineticWord>
      <KineticWord x={65} y={375} size={168} delay={0.1} color={C.green}>
        {COPY.peel[1]}
      </KineticWord>
      <ProductShadow x={650} y={1620} width={650} />
      <AbsoluteFill style={{ maskImage: mask }}>
        <Product
          asset="whole"
          width={459}
          x={670}
          y={1230}
          style={{ rotate: "-8deg" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{ clipPath: `circle(${radius}px at -180px 1200px)` }}
      >
        <Product
          asset="peeled"
          width={730}
          x={625}
          y={1150}
          style={{
            rotate: `${interpolate(frame, [0, 1.6 * fps], [-8, 0], ease)}deg`,
          }}
        />
      </AbsoluteFill>
      {/* The arc is the visible peel edge of the same circular mask, not a morph. */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        fill="none"
      >
        <circle
          cx={-180}
          cy={1200}
          r={radius}
          stroke={C.banana}
          strokeWidth={100}
        />
        <circle
          cx={-180}
          cy={1200}
          r={Math.max(0, radius - 76)}
          stroke={C.cream}
          strokeWidth={8}
        />
        <circle
          cx={-180}
          cy={1200}
          r={Math.max(0, radius - 108)}
          stroke={C.green}
          strokeWidth={3}
        />
      </svg>
      <FloatingShape x={115} y={1520} size={110} ring />
      <FloatingShape x={930} y={720} size={70} color={C.red} />
    </Stage>
  );
};

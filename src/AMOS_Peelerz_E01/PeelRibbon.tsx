import {
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  C,
  ease,
  hookTravel,
  getCamera,
  loopPassTime,
  planeZoom,
  GUMMY,
  lensCover,
  ORIGIN,
  sampleTrack,
  WORLD,
} from "./timeline";

export const PeelRibbon = ({
  foreground = false,
}: {
  foreground?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const camera = getCamera(t);
  if (!foreground) {
    // PELAR?'s baseline lives in the .65 typography plane. Convert its end
    // into product-plane world space so the underline becomes this same curve.
    const anchorX = 900 + hookTravel(t) + (camera.x - ORIGIN.x) * 0.35;
    const anchorY = 1545 + (camera.y - ORIGIN.y) * 0.35;
    const attach = interpolate(t, [1.15, 1.95], [0, 1], ease);
    const startX = anchorX + (1150 - anchorX) * attach;
    const startY = anchorY + (1590 - anchorY) * attach;
    const connected = `M${startX} ${startY}C${startX + 280} ${startY + 20} 1890 1500 1680 2010S1700 2670 2280 2800S2820 3510 3220 3570S3970 4080 2960 4460`;
    const growth = interpolate(
      t,
      [0.88, 1.25, 1.85, 2.65],
      [0, 0.1, 0.38, 1],
      ease,
    );
    const width = interpolate(t, [0.88, 1.2, 1.7], [4, 12, 115], ease);
    const drift = interpolate(t, [6.4, 8.5], [0, -12], ease);
    return (
      <svg
        viewBox="0 0 5000 5600"
        width={WORLD.width}
        height={WORLD.height}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          translate: `${drift}px 0`,
          opacity: growth <= 0 ? 0 : 1,
        }}
        fill="none"
      >
        <path
          d={connected}
          pathLength={1}
          strokeDasharray={`${growth} 1`}
          stroke={interpolateColors(t, [0.88, 1.45], [C.green, C.banana])}
          strokeWidth={width}
          strokeLinecap="round"
        />
        <path
          d={connected}
          pathLength={1}
          strokeDasharray={`${growth} 1`}
          stroke={C.cream}
          strokeWidth={3}
          transform="translate(-55 -22)"
        />
      </svg>
    );
  }
  const gummy = sampleTrack(t, GUMMY);
  const near = lensCover(t);
  const seam = loopPassTime(t);
  const zoom = planeZoom(camera.scale, 1.3);
  const cameraX = ORIGIN.x + (camera.x - ORIGIN.x) * 1.3;
  const cameraY = ORIGIN.y + (camera.y - ORIGIN.y) * 1.3;
  if (seam !== null) {
    // The same bent ribbon travels left-to-right through the lens at constant
    // screen-space speed before and after the seam. No end-card yellow hold.
    const offset = seam * 7500 + 125;
    const loopPath = `M${offset} -4000C${offset + 100} -1700 ${offset - 180} -900 ${offset} 0S${offset + 180} 1700 ${offset} 4000`;
    return (
      <svg
        data-loop-pass={seam}
        viewBox="0 0 5000 5600"
        width={WORLD.width}
        height={WORLD.height}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
        fill="none"
      >
        <path
          d={loopPath}
          stroke={C.banana}
          strokeWidth={2400}
          strokeLinecap="round"
          transform={`translate(${cameraX} ${cameraY}) rotate(${camera.rotation}) scale(${1 / zoom})`}
        />
      </svg>
    );
  }
  const approach = interpolate(near, [0, 0.7, 1], [0, 1, 1]);
  const x = gummy.x + (cameraX - gummy.x) * approach;
  const y = gummy.y + (cameraY - gummy.y) * approach;
  const drift = (1 - approach) * 520;
  const path = `M${x - 1700} ${y + 1700}C${x + 1800} ${y + 1200} ${x - 1400} ${y - 850} ${x + drift} ${y}S${x + 1550} ${y - 500} ${x + 1500} ${y - 1900}`;
  return (
    <svg
      data-lens-cover={near}
      viewBox="0 0 5000 5600"
      width={WORLD.width}
      height={WORLD.height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
      fill="none"
    >
      <path
        d={path}
        stroke={C.banana}
        strokeWidth={Math.max(0.01, (near ** 3 * 3200) / zoom)}
        strokeLinecap="round"
      />
    </svg>
  );
};

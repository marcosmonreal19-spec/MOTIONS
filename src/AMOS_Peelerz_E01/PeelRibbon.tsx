import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C,
  getCamera,
  loopPassTime,
  planeZoom,
  GUMMY,
  lensCover,
  ORIGIN,
  sampleTrack,
  WORLD,
} from "./timeline";

const trajectory =
  "M1150 1590C1640 1790 1890 1500 1680 2010S1700 2670 2280 2800S2820 3510 3220 3570S3970 4080 2960 4460";

export const PeelRibbon = ({
  foreground = false,
}: {
  foreground?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (!foreground)
    return (
      <svg
        viewBox="0 0 5000 5600"
        width={WORLD.width}
        height={WORLD.height}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
        fill="none"
      >
        <path
          d={trajectory}
          stroke={C.banana}
          strokeWidth={115}
          strokeLinecap="round"
        />
        <path
          d={trajectory}
          stroke={C.cream}
          strokeWidth={3}
          transform="translate(-55 -22)"
        />
        <path
          d={trajectory}
          stroke={C.green}
          strokeWidth={3}
          strokeDasharray="240 20000"
          transform="translate(-85 -40)"
        />
      </svg>
    );
  const camera = getCamera(t);
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

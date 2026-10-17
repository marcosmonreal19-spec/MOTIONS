import type { ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { getCamera, ORIGIN, planeZoom, WORLD } from "./timeline";

export const CameraRig = ({
  depth,
  children,
}: {
  depth: number;
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const camera = getCamera(frame / fps);
  const x = ORIGIN.x + (camera.x - ORIGIN.x) * depth;
  const y = ORIGIN.y + (camera.y - ORIGIN.y) * depth;
  // Products and the lens-crossing remain strictly planar. Only supporting
  // graphic planes have sub-degree perspective, around the camera center.
  const graphicTilt =
    depth === 1 || depth === 1.3 ? 0 : depth === 0.65 ? 0.45 : 1;
  const tiltX = Math.sin((camera.rotation * Math.PI) / 180) * 3 * graphicTilt;
  const tiltY = camera.rotation * 0.15 * graphicTilt;
  return (
    <div
      data-plane-depth={depth}
      style={{
        position: "absolute",
        width: WORLD.width,
        height: WORLD.height,
        transformOrigin: "0 0",
        transform: `translate(540px, 960px) perspective(6000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${planeZoom(camera.scale, depth)}) rotate(${-camera.rotation}deg) translate(${-x}px, ${-y}px)`,
      }}
    >
      {children}
    </div>
  );
};

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
  return (
    <div
      data-plane-depth={depth}
      style={{
        position: "absolute",
        width: WORLD.width,
        height: WORLD.height,
        transformOrigin: "0 0",
        transform: `translate(540px, 960px) scale(${planeZoom(camera.scale, depth)}) rotate(${-camera.rotation}deg) translate(${-x}px, ${-y}px)`,
      }}
    >
      {children}
    </div>
  );
};

import { AbsoluteFill } from "remotion";
import { BackgroundWorld } from "./BackgroundWorld";
import { CameraRig } from "./CameraRig";
import { PeelRibbon } from "./PeelRibbon";
import { ProductLayer } from "./ProductLayer";
import { Typography } from "./Typography";
import { C } from "./timeline";

export const World = () => (
  <AbsoluteFill style={{ background: C.banana, overflow: "hidden" }}>
    <CameraRig depth={0.25}>
      <BackgroundWorld />
    </CameraRig>
    <CameraRig depth={1}>
      <PeelRibbon />
    </CameraRig>
    <CameraRig depth={0.65}>
      <Typography />
    </CameraRig>
    <CameraRig depth={1}>
      <ProductLayer />
    </CameraRig>
    <CameraRig depth={0.65}>
      <Typography foreground />
    </CameraRig>
    <CameraRig depth={1.3}>
      <PeelRibbon foreground />
    </CameraRig>
  </AbsoluteFill>
);

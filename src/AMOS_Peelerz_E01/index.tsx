import {
  AbsoluteFill,
  Freeze,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { Scene5 } from "./Scene5";
import { C, ease, SceneTransition } from "./shared";

export const AMOS_Peelerz_E01 = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.banana }}>
      <Sequence
        name="01 — Gomita completa"
        durationInFrames={1.4 * fps}
        premountFor={fps}
      >
        <Scene1 />
      </Sequence>
      <Sequence
        name="02 — Peel / wipe"
        from={1.4 * fps}
        durationInFrames={1.6 * fps}
        premountFor={fps}
      >
        <Scene2 />
      </Sequence>
      <Sequence
        name="03 — Pélala"
        from={3 * fps}
        durationInFrames={1.6 * fps}
        premountFor={fps}
      >
        <Scene3 />
      </Sequence>
      <Sequence
        name="04 — Empaque"
        from={4.6 * fps}
        durationInFrames={2 * fps}
        premountFor={fps}
      >
        <Scene4 />
      </Sequence>
      <Sequence
        name="05 — Cierre"
        from={6.6 * fps}
        durationInFrames={1.4 * fps}
        premountFor={fps}
      >
        <Scene5 />
      </Sequence>
      <SceneTransition />
      {/* The final curved cover reveals the exact opening frame for a clean loop. */}
      {frame >= 7.72 * fps ? (
        <AbsoluteFill
          style={{
            clipPath: `circle(${interpolate(frame, [7.72 * fps, 8 * fps - 1], [0, 2400], ease)}px at -12% 80%)`,
          }}
        >
          <Freeze frame={0}>
            <Scene1 />
          </Freeze>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

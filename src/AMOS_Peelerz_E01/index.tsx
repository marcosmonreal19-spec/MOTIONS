import { Sequence, useVideoConfig } from "remotion";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Scene4 } from "./Scene4";
import { Scene5 } from "./Scene5";

export const AMOS_Peelerz_E01 = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Sequence
        name="01 — Gomita completa"
        durationInFrames={1.5 * fps}
        premountFor={fps}
      >
        <Scene1 />
      </Sequence>
      <Sequence
        name="02 — Peel / wipe"
        from={1.5 * fps}
        durationInFrames={1.7 * fps}
        premountFor={fps}
      >
        <Scene2 />
      </Sequence>
      <Sequence
        name="03 — Pélala"
        from={3.2 * fps}
        durationInFrames={1.8 * fps}
        premountFor={fps}
      >
        <Scene3 />
      </Sequence>
      <Sequence
        name="04 — Empaque"
        from={5 * fps}
        durationInFrames={2 * fps}
        premountFor={fps}
      >
        <Scene4 />
      </Sequence>
      <Sequence
        name="05 — Cierre"
        from={7 * fps}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Scene5 />
      </Sequence>
    </>
  );
};

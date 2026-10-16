import { Composition } from "remotion";
import { MotionsVertical } from "./Video";
import { AMOS_Peelerz_E01 } from "./AMOS_Peelerz_E01";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MOTIONS-Vertical"
        component={MotionsVertical}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AMOS-Peelerz-E01"
        component={AMOS_Peelerz_E01}
        durationInFrames={255}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

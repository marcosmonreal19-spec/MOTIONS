import {Composition} from 'remotion';
import {MotionsVertical} from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MOTIONS-Vertical"
      component={MotionsVertical}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const MotionsVertical: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const intro = spring({
    frame,
    fps,
    config: {
      damping: 16,
      mass: 0.8,
      stiffness: 120,
    },
  });

  const scale = interpolate(intro, [0, 1], [0.86, 1]);
  const opacity = interpolate(frame, [0, 18, 390, 440], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [0, 40], [70, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(circle at 50% 35%, #242424 0%, #111111 45%, #050505 100%)',
        color: 'white',
        fontFamily: 'Arial, Helvetica, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 660,
          height: 660,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.14)',
          transform: `scale(${1 + frame / 2200})`,
        }}
      />

      <div
        style={{
          textAlign: 'center',
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          padding: '0 90px',
        }}
      >
        <div
          style={{
            fontSize: 32,
            letterSpacing: 10,
            fontWeight: 600,
            opacity: 0.55,
            marginBottom: 28,
          }}
        >
          REMOTION LAB
        </div>
        <div
          style={{
            fontSize: 126,
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: -7,
          }}
        >
          MOTIONS
        </div>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.35,
            fontWeight: 400,
            opacity: 0.7,
            marginTop: 34,
          }}
        >
          1080 × 1920 · 30 FPS · 15 S
        </div>
      </div>
    </AbsoluteFill>
  );
};

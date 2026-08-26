import {Lottie, LottieAnimationData} from '@remotion/lottie';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import animacao from './marca-lottie.json';
import {PAPEL, TINTA, VERMELHO} from './desenho';

const MONO = '"Space Mono", monospace';
const DISPLAY = 'Archivo, sans-serif';

// O ficheiro Lottie e um asset: aqui foi escrito a mao, mas podia vir do
// After Effects ou do LottieFiles sem mudar uma linha desta composicao.
export const EstiloLottie: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entra = spring({frame: frame - 6, fps, config: {damping: 200}});
  const legenda = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: PAPEL}}>
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 120,
          fontFamily: MONO,
          fontSize: 24,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: TINTA,
          opacity: 0.6,
        }}
      >
        Teste de estilo 03 — lottie
      </div>

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div
          style={{
            width: 900,
            height: 900,
            opacity: entra,
            transform: `scale(${interpolate(entra, [0, 1], [0.85, 1])})`,
          }}
        >
          <Lottie animationData={animacao as unknown as LottieAnimationData} loop />
        </div>
      </AbsoluteFill>

      <div style={{position: 'absolute', left: 60, right: 60, bottom: 320, opacity: legenda}}>
        <div
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 92,
            lineHeight: 0.94,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: TINTA,
          }}
        >
          Ficheiro Lottie<br />
          tocado no vídeo
        </div>
        <div
          style={{
            marginTop: 26,
            height: 10,
            width: interpolate(legenda, [0, 1], [0, 260]),
            backgroundColor: VERMELHO,
          }}
        />
        <div
          style={{
            marginTop: 26,
            fontFamily: MONO,
            fontSize: 28,
            lineHeight: 1.5,
            color: TINTA,
            opacity: 0.75,
          }}
        >
          trim paths, saltos e rotação vindos do JSON —
          <br />o Remotion só põe a folha, o texto e o compasso.
        </div>
      </div>

      {/* O mesmo ficheiro outra vez, pequeno: um Lottie e reutilizavel como qualquer asset. */}
      <div style={{position: 'absolute', right: 54, top: 96, width: 130, height: 130, opacity: legenda}}>
        <Lottie animationData={animacao as unknown as LottieAnimationData} loop />
      </div>
    </AbsoluteFill>
  );
};

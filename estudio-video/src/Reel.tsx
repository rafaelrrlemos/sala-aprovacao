import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {z} from 'zod';

export const reelSchema = z.object({
  marca: z.string(),
  titulo: z.string(),
  subtitulo: z.string(),
  cenas: z.array(z.string()),
  cta: z.string(),
});

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const VERDE = '#7bd47b';

const Fundo: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const giro = interpolate(frame, [0, durationInFrames], [0, 40]);
  const sobe = interpolate(frame, [0, durationInFrames], [0, -220]);

  return (
    <AbsoluteFill style={{backgroundColor: '#10151c'}}>
      <AbsoluteFill
        style={{
          transform: `scale(2) rotate(${giro}deg) translateY(${sobe}px)`,
          opacity: 0.55,
          background:
            'radial-gradient(circle at 30% 25%, #1f6f5c 0%, transparent 45%),' +
            'radial-gradient(circle at 75% 70%, #23405f 0%, transparent 50%)',
        }}
      />
    </AbsoluteFill>
  );
};

const Etiqueta: React.FC<{texto: string; atraso: number}> = ({texto, atraso}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrada = spring({frame: frame - atraso, fps, config: {damping: 200}});

  return (
    <div
      style={{
        alignSelf: 'flex-start',
        backgroundColor: VERDE,
        color: '#10151c',
        padding: '18px 34px',
        borderRadius: 18,
        fontFamily: FONT,
        fontSize: 46,
        fontWeight: 700,
        letterSpacing: 2,
        opacity: entrada,
        transform: `translateX(${interpolate(entrada, [0, 1], [-60, 0])}px)`,
      }}
    >
      {texto}
    </div>
  );
};

const Abertura: React.FC<{titulo: string; subtitulo: string; marca: string}> = ({
  titulo,
  subtitulo,
  marca,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({frame, fps, config: {damping: 14, mass: 0.8}});
  const s = spring({frame: frame - 12, fps, config: {damping: 200}});

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 90,
        gap: 40,
      }}
    >
      <Etiqueta texto={marca} atraso={0} />
      <h1
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: 118,
          lineHeight: 1.05,
          color: 'white',
          textAlign: 'center',
          transform: `scale(${interpolate(t, [0, 1], [0.8, 1])})`,
          opacity: t,
        }}
      >
        {titulo}
      </h1>
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: 52,
          color: VERDE,
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
        }}
      >
        {subtitulo}
      </p>
    </AbsoluteFill>
  );
};

const Passo: React.FC<{texto: string; numero: number}> = ({texto, numero}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const entrada = spring({frame, fps, config: {damping: 18}});
  const saida = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', easing: Easing.ease},
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        padding: 100,
        gap: 44,
        opacity: saida,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 200,
          fontWeight: 800,
          color: VERDE,
          opacity: entrada * 0.35,
          transform: `translateY(${interpolate(entrada, [0, 1], [60, 0])}px)`,
        }}
      >
        {String(numero).padStart(2, '0')}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 86,
          lineHeight: 1.2,
          color: 'white',
          opacity: entrada,
          transform: `translateX(${interpolate(entrada, [0, 1], [80, 0])}px)`,
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

const Fecho: React.FC<{cta: string; marca: string}> = ({cta, marca}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrada = spring({frame, fps, config: {damping: 16}});
  const pulso = 1 + Math.sin(frame / 8) * 0.02;

  return (
    <AbsoluteFill
      style={{justifyContent: 'center', alignItems: 'center', padding: 100, gap: 50}}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 76,
          color: 'white',
          textAlign: 'center',
          opacity: entrada,
          transform: `scale(${interpolate(entrada, [0, 1], [0.85, 1]) * pulso})`,
        }}
      >
        {cta}
      </div>
      <div
        style={{
          height: 6,
          width: interpolate(entrada, [0, 1], [0, 420]),
          backgroundColor: VERDE,
          borderRadius: 3,
        }}
      />
      <div
        style={{
          fontFamily: FONT,
          fontSize: 44,
          letterSpacing: 8,
          color: VERDE,
          opacity: entrada,
        }}
      >
        {marca}
      </div>
    </AbsoluteFill>
  );
};

export const Reel: React.FC<z.infer<typeof reelSchema>> = ({
  marca,
  titulo,
  subtitulo,
  cenas,
  cta,
}) => {
  const abertura = 75;
  const porPasso = 45;

  return (
    <AbsoluteFill>
      <Fundo />
      <Sequence durationInFrames={abertura}>
        <Abertura titulo={titulo} subtitulo={subtitulo} marca={marca} />
      </Sequence>
      {cenas.map((cena, i) => (
        <Sequence
          key={cena}
          from={abertura + i * porPasso}
          durationInFrames={porPasso}
        >
          <Passo texto={cena} numero={i + 1} />
        </Sequence>
      ))}
      <Sequence from={abertura + cenas.length * porPasso}>
        <Fecho cta={cta} marca={marca} />
      </Sequence>
    </AbsoluteFill>
  );
};

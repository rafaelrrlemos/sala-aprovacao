import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {MARCA, MONO} from '../canon/marca';

const KRAFT = '#DCD2BE';
const KRAFT_ESCURO = '#C0B49B';
const TINTA = MARCA.stamp;
const DISPLAY = 'Archivo, sans-serif';

// Papel: fibra e mancha geradas por ruido, sem imagem nenhuma.
const Papel: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: KRAFT}}>
    <svg width={1080} height={1920} style={{position: 'absolute'}}>
      <defs>
        <filter id="fibra">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} seed={7} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="mancha">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves={4} seed={3} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <radialGradient id="canto">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(60,45,25,0.35)" />
        </radialGradient>
      </defs>
      <rect width={1080} height={1920} filter="url(#mancha)" opacity={0.18} />
      <rect width={1080} height={1920} filter="url(#fibra)" opacity={0.1} />
      <rect width={1080} height={1920} fill="url(#canto)" />
    </svg>
  </AbsoluteFill>
);

// Tipo serigrafado: a tinta entra por cima do papel, com falhas nos bordos.
const Serigrafado: React.FC<{
  texto: string;
  tamanho: number;
  atraso: number;
  y: number;
  estreito?: number;
  cor?: string;
}> = ({texto, tamanho, atraso, y, estreito = 0.84, cor = TINTA}) => {
  const frame = useCurrentFrame();
  const entrada = interpolate(frame - atraso, [0, 7], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const id = `tinta-${texto.replace(/\W/g, '')}`;

  if (frame < atraso) {
    return null;
  }

  return (
    <svg
      width={1080}
      height={tamanho * 1.25}
      style={{position: 'absolute', left: 0, top: y}}
    >
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves={4} seed={11} result="r" />
          <feDisplacementMap in="SourceGraphic" in2="r" scale={6} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}-falha`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={2} seed={5} result="n" />
          <feColorMatrix in="n" type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 -0.3" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="out" />
        </filter>
        <clipPath id={`${id}-corte`}>
          <rect x={0} y={0} width={1080 * entrada} height={tamanho * 1.25} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-corte)`}>
        <g filter={`url(#${id})`}>
          <g filter={`url(#${id}-falha)`}>
            <text
              x={70}
              y={tamanho * 0.86}
              fontFamily={DISPLAY}
              fontWeight={900}
              fontSize={tamanho}
              letterSpacing={-tamanho * 0.03}
              fill={cor}
              transform={`translate(70 0) scale(${estreito} 1) translate(-70 0)`}
            >
              {texto}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

const CodigoBarras: React.FC<{x: number; y: number; largura: number; atraso: number}> = ({
  x,
  y,
  largura,
  atraso,
}) => {
  const frame = useCurrentFrame();
  const visivel = interpolate(frame - atraso, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const barras = new Array(48).fill(0).map((_, i) => 3 + random(`barra-${i}`) * 9);
  const total = barras.reduce((a, b) => a + b + 5, 0);
  const escala = largura / total;
  let cursor = 0;

  return (
    <svg width={largura} height={130} style={{position: 'absolute', left: x, top: y, opacity: visivel}}>
      {barras.map((b, i) => {
        const posicao = cursor;
        cursor += (b + 5) * escala;
        return (
          <rect
            key={i}
            x={posicao}
            y={0}
            width={b * escala}
            height={i % 7 === 0 ? 92 : 78}
            fill={MARCA.ink}
          />
        );
      })}
      <text x={0} y={124} fontFamily={MONO} fontSize={26} letterSpacing={8} fill={MARCA.ink}>
        0019 682 026
      </text>
    </svg>
  );
};

// Carimbo: cai torto, como carimbo a serio.
const Carimbo: React.FC<{atraso: number}> = ({atraso}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bate = spring({frame: frame - atraso, fps, config: {damping: 9, mass: 0.4}});

  if (frame < atraso) {
    return null;
  }

  return (
    <svg
      width={420}
      height={420}
      viewBox="0 0 420 420"
      style={{
        position: 'absolute',
        left: 44,
        top: 1290,
        opacity: bate,
        transform: `rotate(${interpolate(bate, [0, 1], [-26, -9])}deg) scale(${interpolate(
          bate,
          [0, 1],
          [1.7, 1],
        )})`,
      }}
    >
      <defs>
        <path id="volta" d="M210,210 m-136,0 a136,136 0 1,1 272,0 a136,136 0 1,1 -272,0" fill="none" />
      </defs>
      <circle cx={210} cy={210} r={168} fill="none" stroke={TINTA} strokeWidth={10} opacity={0.85} />
      <circle cx={210} cy={210} r={112} fill="none" stroke={TINTA} strokeWidth={4} opacity={0.65} />
      <text fontFamily={MONO} fontWeight={700} fontSize={30} letterSpacing={4} fill={TINTA} opacity={0.9}>
        <textPath href="#volta" startOffset="4%">
          LISBOA TO EUA — CLASS 25 —
        </textPath>
      </text>
      <text
        x={210}
        y={232}
        textAnchor="middle"
        fontFamily={DISPLAY}
        fontWeight={900}
        fontSize={92}
        fill={TINTA}
        opacity={0.9}
      >
        CT
      </text>
    </svg>
  );
};

const Talao: React.FC<{atraso: number}> = ({atraso}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entra = spring({frame: frame - atraso, fps, config: {damping: 16}});
  const linhas: [string, string][] = [
    ['ONE YOU WEAR', '1.00'],
    ['ONE YOU READ', '1.00'],
    ['THE STOP', '—'],
    ['YOUR SEAT', '0.00'],
  ];

  if (frame < atraso) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        right: 66,
        top: 1300,
        width: 400,
        padding: '28px 30px 34px',
        backgroundColor: '#F4EEE1',
        color: MARCA.ink,
        fontFamily: MONO,
        fontSize: 24,
        boxShadow: '0 18px 40px rgba(40,30,15,0.28)',
        opacity: entra,
        transform: `translateY(${interpolate(entra, [0, 1], [70, 0])}px) rotate(2.4deg)`,
      }}
    >
      <div style={{letterSpacing: 6, fontWeight: 700, marginBottom: 6}}>RECEIPT</div>
      <div style={{opacity: 0.6, marginBottom: 18}}>THANK YOU!</div>
      {linhas.map(([nome, valor], i) => (
        <div
          key={nome}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            opacity: interpolate(frame - atraso, [10 + i * 6, 18 + i * 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span>{nome}</span>
          <span>{valor}</span>
        </div>
      ))}
      <div style={{borderTop: `1px dashed ${MARCA.ink}`, margin: '18px 0 12px', opacity: 0.5}} />
      <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 700}}>
        <span>TOTAL</span>
        <span style={{fontSize: 30}}>∞</span>
      </div>
    </div>
  );
};

export const Serigrafia: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Papel />
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 118,
          fontFamily: MONO,
          fontSize: 22,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: MARCA.ink,
          opacity: 0.55,
        }}
      >
        Teste de estilo 04 — serigrafia
      </div>
      <CodigoBarras x={70} y={190} largura={620} atraso={6} />
      <div
        style={{
          position: 'absolute',
          right: 66,
          top: 196,
          padding: '14px 20px',
          backgroundColor: MARCA.ink,
          color: KRAFT,
          fontFamily: MONO,
          fontSize: 21,
          lineHeight: 1.45,
          letterSpacing: 3,
          transform: 'rotate(-2deg)',
          opacity: interpolate(frame, [14, 26], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        AUTHENTIC
        <br />
        MADE FOR
        <br />
        THE ROAD
      </div>

      <Serigrafado texto="CANON" tamanho={300} atraso={26} y={420} />
      <Serigrafado texto="TOURS" tamanho={300} atraso={40} y={690} />
      <Serigrafado texto="SAVE ME A SEAT." tamanho={104} atraso={62} y={990} estreito={0.9} />

      <Carimbo atraso={86} />
      <Talao atraso={100} />

      <div
        style={{
          position: 'absolute',
          left: 70,
          bottom: 140,
          fontFamily: MONO,
          fontSize: 24,
          letterSpacing: 6,
          color: MARCA.ink,
          opacity: interpolate(frame, [140, 160], [0, 0.75], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        HANDLE WITH CARE
      </div>
    </AbsoluteFill>
  );
};

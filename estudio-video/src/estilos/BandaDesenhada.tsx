import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  AMARELO,
  AZUL,
  Balao,
  Cara,
  Carrinha,
  PAPEL,
  Riscas,
  TINTA,
  Trama,
  VERMELHO,
} from './desenho';

const Vinheta: React.FC<{
  x: number;
  y: number;
  largura: number;
  altura: number;
  atraso: number;
  fundo: string;
  children: React.ReactNode;
}> = ({x, y, largura, altura, atraso, fundo, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entra = spring({frame: frame - atraso, fps, config: {damping: 13, mass: 0.5}});
  const id = `trama-${x}-${y}`;

  if (frame < atraso) {
    return null;
  }

  return (
    <svg
      width={largura}
      height={altura}
      viewBox={`0 0 ${largura} ${altura}`}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity: entra,
        transform: `scale(${interpolate(entra, [0, 1], [0.88, 1])}) rotate(${interpolate(
          entra,
          [0, 1],
          [-1.6, 0],
        )}deg)`,
      }}
    >
      <defs>
        <Trama id={id} cor={TINTA} />
        <clipPath id={`corte-${id}`}>
          <rect x={5} y={5} width={largura - 10} height={altura - 10} rx={6} />
        </clipPath>
      </defs>
      <rect x={5} y={5} width={largura - 10} height={altura - 10} rx={6} fill={fundo} />
      <rect
        x={5}
        y={5}
        width={largura - 10}
        height={altura - 10}
        rx={6}
        fill={`url(#${id})`}
        opacity={0.16}
      />
      <g clipPath={`url(#corte-${id})`}>{children}</g>
      <rect
        x={5}
        y={5}
        width={largura - 10}
        height={altura - 10}
        rx={6}
        fill="none"
        stroke={TINTA}
        strokeWidth={10}
      />
    </svg>
  );
};

// Fecho: a última vinheta rebenta a grelha e ocupa o ecrã inteiro.
const Estouro: React.FC<{comeca: number}> = ({comeca}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const abre = spring({frame: frame - comeca, fps, config: {damping: 14, mass: 0.6}});
  const bate = 1 + Math.sin((frame - comeca) / 3.5) * 0.02;

  if (frame < comeca) {
    return null;
  }

  return (
    <AbsoluteFill style={{opacity: abre}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <defs>
          <Trama id="trama-estouro" cor={PAPEL} passo={18} />
        </defs>
        <rect width={1080} height={1920} fill={VERMELHO} />
        <rect width={1080} height={1920} fill="url(#trama-estouro)" opacity={0.22} />
        {new Array(26).fill(0).map((_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const r1 = 260;
          const r2 = 1500;
          return (
            <path
              key={i}
              d={`M${540 + Math.cos(a) * r1},${900 + Math.sin(a) * r1} L${
                540 + Math.cos(a) * r2
              },${900 + Math.sin(a) * r2}`}
              stroke={TINTA}
              strokeWidth={i % 2 ? 6 : 14}
              opacity={0.5}
            />
          );
        })}
        <g transform={`translate(540 880) scale(${interpolate(abre, [0, 1], [0.4, 1]) * bate})`}>
          <text
            textAnchor="middle"
            fontFamily="Archivo, sans-serif"
            fontWeight={900}
            fontSize={196}
            fill={PAPEL}
            stroke={TINTA}
            strokeWidth={18}
            paintOrder="stroke"
            transform="rotate(-7)"
          >
            VROOM!
          </text>
        </g>
        <g transform="translate(250 1200) scale(1.6)">
          <Carrinha cor={AZUL} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const BandaDesenhada: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: PAPEL}}>
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 120,
          fontFamily: '"Space Mono", monospace',
          fontSize: 24,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: TINTA,
          opacity: 0.6,
        }}
      >
        Teste de estilo 01 — vinhetas
      </div>

      <Vinheta x={60} y={190} largura={960} altura={520} atraso={4} fundo="#CFE0EE">
        <Riscas largura={960} altura={520} />
        <g transform="translate(300 250) scale(1.2)">
          <Carrinha />
        </g>
        <Balao x={60} y={40} largura={520} altura={110} texto="SO... WHERE TO?" atraso={22} />
      </Vinheta>

      <Vinheta x={60} y={730} largura={468} altura={470} atraso={44} fundo="#F6D9A0">
        <g transform="translate(234 250) scale(1.25)">
          <Cara cor={AMARELO} />
        </g>
        <Balao x={40} y={40} largura={330} altura={100} texto="TRUST ME." atraso={58} tamanho={36} />
      </Vinheta>

      <Vinheta x={552} y={730} largura={468} altura={470} atraso={62} fundo="#E7CFE3">
        <g transform="translate(234 250) scale(1.25)">
          <Cara cor="#EF9A76" sorriso={false} />
        </g>
        <Balao
          x={70}
          y={40}
          largura={330}
          altura={100}
          texto="THAT'S THE PART..."
          atraso={76}
          bico="direita"
          tamanho={26}
        />
      </Vinheta>

      <Vinheta x={60} y={1220} largura={960} altura={470} atraso={86} fundo="#CBE3D4">
        <Riscas largura={960} altura={470} n={7} />
        <g transform="translate(660 120) scale(1.2) scale(-1 1)">
          <Carrinha cor={AZUL} />
        </g>
        <Balao
          x={430}
          y={40}
          largura={470}
          altura={110}
          texto="...I LIKE."
          atraso={104}
          bico="direita"
        />
      </Vinheta>

      <Estouro comeca={172} />
    </AbsoluteFill>
  );
};

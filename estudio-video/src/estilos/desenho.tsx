import {interpolate, useCurrentFrame} from 'remotion';

export const TINTA = '#14110E';
export const PAPEL = '#F2ECDD';
export const VERMELHO = '#E2483A';
export const AZUL = '#2E6BA8';
export const AMARELO = '#F0B429';

// Trama de pontos: o cinzento da banda desenhada impressa.
export const Trama: React.FC<{id: string; cor?: string; passo?: number}> = ({
  id,
  cor = TINTA,
  passo = 14,
}) => (
  <pattern id={id} width={passo} height={passo} patternUnits="userSpaceOnUse">
    <circle cx={passo / 2} cy={passo / 2} r={passo * 0.17} fill={cor} />
  </pattern>
);

export const Carrinha: React.FC<{cor?: string}> = ({cor = VERMELHO}) => {
  const frame = useCurrentFrame();
  const roda = (frame * 14) % 360;
  const solta = Math.sin(frame / 4) * 3;

  return (
    <g transform={`translate(0 ${solta})`}>
      <path
        d="M40,150 L40,80 Q40,64 58,64 L210,64 Q228,64 236,80 L268,132 L330,140 Q348,143 348,160 L348,196 Q348,208 332,208 L48,208 Q40,208 40,198 Z"
        fill={cor}
        stroke={TINTA}
        strokeWidth={9}
        strokeLinejoin="round"
      />
      <path
        d="M232,96 L258,134 L206,134 L206,96 Z"
        fill={PAPEL}
        stroke={TINTA}
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <rect x={70} y={92} width={110} height={46} rx={6} fill={PAPEL} stroke={TINTA} strokeWidth={7} />
      {[
        {cx: 118, cy: 208},
        {cx: 288, cy: 208},
      ].map(({cx, cy}) => (
        <g key={cx} transform={`translate(${cx} ${cy}) rotate(${roda})`}>
          <circle r={38} fill={TINTA} />
          <circle r={17} fill={PAPEL} stroke={TINTA} strokeWidth={6} />
          <rect x={-3} y={-38} width={6} height={20} fill={PAPEL} />
          <rect x={-3} y={18} width={6} height={20} fill={PAPEL} />
        </g>
      ))}
    </g>
  );
};

export const Cara: React.FC<{cor?: string; sorriso?: boolean}> = ({
  cor = AMARELO,
  sorriso = true,
}) => {
  const frame = useCurrentFrame();
  const pisca = frame % 70 < 5;

  return (
    <g>
      <circle cx={0} cy={0} r={96} fill={cor} stroke={TINTA} strokeWidth={9} />
      <path
        d="M-98,-24 Q-84,-116 0,-104 Q86,-114 96,-20 Q60,-70 0,-62 Q-58,-66 -98,-24 Z"
        fill={TINTA}
      />
      {pisca ? (
        <>
          <path d="M-52,-8 h34" stroke={TINTA} strokeWidth={9} strokeLinecap="round" />
          <path d="M18,-8 h34" stroke={TINTA} strokeWidth={9} strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={-34} cy={-8} r={10} fill={TINTA} />
          <circle cx={34} cy={-8} r={10} fill={TINTA} />
        </>
      )}
      {sorriso ? (
        <path d="M-40,38 Q0,74 40,38" stroke={TINTA} strokeWidth={9} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M-34,52 h68" stroke={TINTA} strokeWidth={9} strokeLinecap="round" />
      )}
    </g>
  );
};

// Linhas de velocidade: entram por trás do que se move.
export const Riscas: React.FC<{n?: number; largura: number; altura: number}> = ({
  n = 9,
  largura,
  altura,
}) => {
  const frame = useCurrentFrame();

  return (
    <g>
      {new Array(n).fill(0).map((_, i) => {
        const y = (altura / (n + 1)) * (i + 1);
        const desliza = ((frame * 26 + i * 90) % (largura + 320)) - 320;
        const comprimento = 90 + (i % 3) * 70;

        return (
          <rect
            key={i}
            x={largura - desliza}
            y={y}
            width={comprimento}
            height={7}
            rx={3.5}
            fill={TINTA}
            opacity={0.55}
          />
        );
      })}
    </g>
  );
};

export const Balao: React.FC<{
  x: number;
  y: number;
  largura: number;
  altura: number;
  texto: string;
  atraso: number;
  bico?: 'esquerda' | 'direita';
  tamanho?: number;
}> = ({x, y, largura, altura, texto, atraso, bico = 'esquerda', tamanho = 40}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - atraso, [0, 5, 8], [0, 1.12, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < atraso) {
    return null;
  }

  const pontaX = bico === 'esquerda' ? x + 40 : x + largura - 40;
  const pontaSentido = bico === 'esquerda' ? -34 : 34;

  return (
    <g transform={`translate(${x + largura / 2} ${y + altura / 2}) scale(${t}) translate(${-(x + largura / 2)} ${-(y + altura / 2)})`}>
      <path
        d={`M${pontaX},${y + altura - 4} l${pontaSentido},46 l${-pontaSentido * 0.1},-46 Z`}
        fill={PAPEL}
        stroke={TINTA}
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <rect
        x={x}
        y={y}
        width={largura}
        height={altura}
        rx={altura / 2.4}
        fill={PAPEL}
        stroke={TINTA}
        strokeWidth={7}
      />
      <text
        x={x + largura / 2}
        y={y + altura / 2 + tamanho * 0.35}
        textAnchor="middle"
        fontFamily="Archivo, sans-serif"
        fontWeight={900}
        fontSize={tamanho}
        letterSpacing={-0.5}
        fill={TINTA}
      >
        {texto}
      </text>
    </g>
  );
};

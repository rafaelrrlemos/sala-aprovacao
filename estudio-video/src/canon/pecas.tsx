import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {DISPLAY, MARCA, MONO} from './marca';

export const Folha: React.FC<{claro: boolean; children: React.ReactNode}> = ({
  claro,
  children,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entra = spring({frame, fps, config: {damping: 200, mass: 0.5}});

  return (
    <AbsoluteFill
      style={{
        backgroundColor: claro ? MARCA.bone : MARCA.pavement,
        transform: `translateY(${interpolate(entra, [0, 1], [100, 0])}%)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Barra fixa de topo: o cabeçalho do cartaz, presente em todas as telas.
export const Topo: React.FC<{claro: boolean}> = ({claro}) => {
  const cor = claro ? MARCA.fadedDk : MARCA.faded;

  return (
    <div style={{position: 'absolute', left: 96, right: 96, top: 120}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: MONO,
          fontSize: 26,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: cor,
        }}
      >
        <span style={{color: claro ? MARCA.ink : MARCA.bone, fontWeight: 700}}>Canon Tours</span>
        <span>Class 25</span>
      </div>
      <div
        style={{
          marginTop: 18,
          height: 1,
          backgroundColor: cor,
          opacity: 0.4,
        }}
      />
    </div>
  );
};

// Linha de display: sobe por trás de uma janela, como papel a ser puxado.
const LARGURA_BLOCO = 888;
// Archivo Black em caixa alta ocupa ~0.7em por caractere: chega para garantir
// que cada linha do cartaz cabe numa linha só, sem medir o DOM.
const RACIO_LARGURA = 0.7;

export const LinhaDisplay: React.FC<{
  texto: string;
  atraso: number;
  tamanho: number;
  cor: string;
  largura?: number;
}> = ({texto, atraso, tamanho, cor, largura = LARGURA_BLOCO}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cabe = Math.min(tamanho, largura / (texto.length * RACIO_LARGURA));
  const sobe = spring({
    frame: frame - atraso,
    fps,
    config: {damping: 200, mass: 0.55},
  });

  return (
    <div style={{overflow: 'hidden', paddingBottom: cabe * 0.06}}>
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontSize: cabe,
          whiteSpace: 'nowrap',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: cor,
          transform: `translateY(${interpolate(sobe, [0, 1], [110, 0])}%)`,
        }}
      >
        {texto}
      </div>
    </div>
  );
};

// Voz escrita do tour manager: aparece a ser dactilografada, nunca já pronta.
export const Datilografado: React.FC<{
  texto: string;
  atraso: number;
  cor: string;
  tamanho?: number;
  porCaractere?: number;
}> = ({texto, atraso, cor, tamanho = 32, porCaractere = 1.1}) => {
  const frame = useCurrentFrame();
  const decorrido = Math.max(0, frame - atraso);
  const visiveis = Math.min(texto.length, Math.floor(decorrido / porCaractere));
  const aEscrever = visiveis < texto.length;
  const cursor = Math.floor(frame / 8) % 2 === 0;

  if (decorrido <= 0) {
    return null;
  }

  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: tamanho,
        lineHeight: 1.5,
        letterSpacing: '0.02em',
        color: cor,
      }}
    >
      {texto.slice(0, visiveis)}
      <span style={{opacity: aEscrever || cursor ? 1 : 0}}>▍</span>
    </div>
  );
};

export const Sobrancelha: React.FC<{texto: string; cor: string}> = ({texto, cor}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 24,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: cor,
    }}
  >
    {texto}
  </div>
);

// O número da contagem: grande, descentrado, lido só ao segundo olhar.
export const Numero: React.FC<{valor: string; claro: boolean}> = ({valor, claro}) => {
  const frame = useCurrentFrame();
  const opacidade = interpolate(frame, [8, 40], [0, claro ? 0.14 : 0.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        right: -40,
        bottom: 300,
        fontFamily: DISPLAY,
        fontWeight: 900,
        fontSize: 560,
        lineHeight: 0.8,
        letterSpacing: '-0.06em',
        color: claro ? MARCA.ink : MARCA.bone,
        opacity: opacidade,
      }}
    >
      {valor}
    </div>
  );
};

export const Picotado: React.FC<{claro: boolean; largura?: number}> = ({
  claro,
  largura = 500,
}) => {
  const frame = useCurrentFrame();
  const cresce = interpolate(frame, [6, 30], [0, largura], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: cresce,
        borderTop: `2px dashed ${claro ? MARCA.fadedDk : MARCA.faded}`,
        opacity: 0.5,
      }}
    />
  );
};

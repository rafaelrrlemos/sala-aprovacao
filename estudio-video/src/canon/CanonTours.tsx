import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {DISPLAY, MARCA, MONO} from './marca';
import {
  Datilografado,
  Folha,
  LinhaDisplay,
  Numero,
  Picotado,
  Sobrancelha,
  Topo,
} from './pecas';

const BLOCO: React.CSSProperties = {
  position: 'absolute',
  left: 96,
  right: 96,
  top: 300,
  bottom: 430,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 34,
};

// 01 — O gancho. Existe uma digressão e o destino não se diz.
const Gancho: React.FC = () => (
  <Folha claro={false}>
    <Topo claro={false} />
    <Numero valor="30" claro={false} />
    <div style={BLOCO}>
      <Sobrancelha texto="Lisboa to EUA — Est. MMXXVI" cor={MARCA.faded} />
      <div>
        <LinhaDisplay texto="I booked" atraso={6} tamanho={140} cor={MARCA.bone} />
        <LinhaDisplay texto="a tour and" atraso={12} tamanho={140} cor={MARCA.bone} />
        <LinhaDisplay texto="I won't say" atraso={18} tamanho={140} cor={MARCA.bone} />
        <LinhaDisplay texto="where." atraso={24} tamanho={140} cor={MARCA.bone} />
      </div>
      <Datilografado
        texto="day thirty. that's all i'm giving away."
        atraso={50}
        cor={MARCA.faded}
      />
    </div>
  </Folha>
);

// 02 — A objeção, dita por outra pessoa. Voz escrita, nome tapado.
const Objecao: React.FC = () => (
  <Folha claro>
    <Topo claro />
    <div style={BLOCO}>
      <Sobrancelha texto="06:04 — reply" cor={MARCA.fadedDk} />
      <Datilografado
        texto={'"i wouldn\'t go if i didn\'t know where."'}
        atraso={4}
        cor={MARCA.ink}
        tamanho={36}
        porCaractere={1.15}
      />
      <Picotado claro largura={620} />
      <LinhaDisplay texto="Fair." atraso={62} tamanho={210} cor={MARCA.ink} />
      <Datilografado
        texto="i've cancelled trips for less."
        atraso={78}
        cor={MARCA.fadedDk}
      />
    </div>
  </Folha>
);

// 03 — A viragem: o destino nunca foi a parte que fica.
const Viragem: React.FC = () => (
  <Folha claro={false}>
    <Topo claro={false} />
    <div style={BLOCO}>
      <div>
        <LinhaDisplay texto="I knew" atraso={4} tamanho={150} cor={MARCA.bone} />
        <LinhaDisplay texto="the city." atraso={10} tamanho={150} cor={MARCA.bone} />
        <LinhaDisplay texto="I didn't know" atraso={22} tamanho={96} cor={MARCA.faded} />
        <LinhaDisplay texto="the night." atraso={28} tamanho={150} cor={MARCA.bone} />
      </div>
      <Datilografado
        texto="the city isn't the part i remember."
        atraso={62}
        cor={MARCA.faded}
      />
    </div>
  </Folha>
);

// 04 — A tese fechada no D30. É o que a campanha inteira defende.
const Tese: React.FC = () => (
  <Folha claro>
    <Topo claro />
    <Numero valor="29" claro />
    <div style={BLOCO}>
      <div>
        <LinhaDisplay texto="Not knowing" atraso={4} tamanho={132} cor={MARCA.ink} />
        <LinhaDisplay texto="where isn't" atraso={10} tamanho={132} cor={MARCA.ink} />
        <LinhaDisplay texto="the same as" atraso={16} tamanho={132} cor={MARCA.ink} />
        <LinhaDisplay texto="going nowhere." atraso={22} tamanho={104} cor={MARCA.ink} />
      </div>
      <Picotado claro largura={780} />
    </div>
  </Folha>
);

// 05 — O alinhamento: duas formas de estar na mesma digressão.
const Alinhamento: React.FC = () => (
  <Folha claro={false}>
    <Topo claro={false} />
    <div style={BLOCO}>
      <Sobrancelha texto="The setlist" cor={MARCA.faded} />
      <div>
        <LinhaDisplay texto="One you wear." atraso={6} tamanho={116} cor={MARCA.bone} />
        <LinhaDisplay texto="One you read." atraso={16} tamanho={116} cor={MARCA.bone} />
      </div>
      <Picotado claro={false} largura={700} />
      <Datilografado
        texto="the tee and the tour guide. day one."
        atraso={48}
        cor={MARCA.faded}
      />
    </div>
  </Folha>
);

// 06 — O único pedido dos 30 dias. É aqui, e só aqui, que o vermelho entra.
const Pedido: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const barra = spring({frame: frame - 30, fps, config: {damping: 200}});
  const assinatura = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Folha claro={false}>
      <Topo claro={false} />
      <div style={BLOCO}>
        <div>
          <LinhaDisplay texto="Save me" atraso={4} tamanho={168} cor={MARCA.stamp} />
          <LinhaDisplay texto="a seat." atraso={12} tamanho={168} cor={MARCA.stamp} />
        </div>
        <div
          style={{
            height: 14,
            width: interpolate(barra, [0, 1], [0, 320]),
            backgroundColor: MARCA.stamp,
          }}
        />
        <Datilografado
          texto="the list hears the destination first."
          atraso={44}
          cor={MARCA.bone}
        />
        <div
          style={{
            fontFamily: MONO,
            fontSize: 24,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: MARCA.faded,
            opacity: assinatura,
          }}
        >
          — tour manager
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 96,
          bottom: 300,
          fontFamily: DISPLAY,
          fontWeight: 500,
          fontSize: 34,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: MARCA.bone,
          opacity: assinatura,
        }}
      >
        Link in bio
      </div>
    </Folha>
  );
};

export const CanonTours: React.FC = () => {
  const compasso = 135;
  const cenas = [Gancho, Objecao, Viragem, Tese, Alinhamento, Pedido];

  return (
    <AbsoluteFill style={{backgroundColor: MARCA.pavement}}>
      {cenas.map((Cena, i) => (
        <Sequence key={Cena.name} from={i * compasso} durationInFrames={compasso}>
          <Cena />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

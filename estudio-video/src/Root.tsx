import {Composition} from 'remotion';
import {Reel, reelSchema} from './Reel';
import {CanonTours} from './canon/CanonTours';
import {BandaDesenhada} from './estilos/BandaDesenhada';
import {EstiloLottie} from './estilos/Lottie';
import {Serigrafia} from './estilos/Serigrafia';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Canon Tours — TikTok/Reels, 27 s. Ver src/canon/. */}
      <Composition
        id="CanonToursTikTok"
        component={CanonTours}
        durationInFrames={810}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Testes de estilo: ver src/estilos/. */}
      <Composition
        id="BandaDesenhada"
        component={BandaDesenhada}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EstiloLottie"
        component={EstiloLottie}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Serigrafia"
        component={Serigrafia}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Teste tecnico do Remotion: prova que a cadeia de render funciona. */}
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
        schema={reelSchema}
        defaultProps={{
          marca: 'TENECI',
          titulo: 'Video feito por prompt',
          subtitulo: 'Remotion + Claude Code',
          cenas: [
            'Escreves o que queres em texto',
            'O codigo desenha cada fotograma',
            'Sai um MP4 pronto a publicar',
          ],
          cta: 'E so pedir a proxima versao',
        }}
      />
    </>
  );
};

import {loadFont} from '@remotion/fonts';
import {continueRender, delayRender, staticFile} from 'remotion';

// Tokens do brand book v3 (2026-07-23) — File 08 Cor / File 09 Tipografia.
export const MARCA = {
  bone: '#E8E4DB',
  bone2: '#D7D1C3',
  pavement: '#15181E',
  ink: '#1B1E24',
  faded: '#9A988D',
  fadedDk: '#74726A',
  blueprint: '#3F6079',
  pasture: '#6F7A52',
  stamp: '#A24C3E',
};

export const DISPLAY = 'Archivo, system-ui, sans-serif';
export const MONO = '"Space Mono", ui-monospace, monospace';

const espera = delayRender('fontes da marca');

Promise.all([
  loadFont({
    family: 'Archivo',
    url: staticFile('fontes/archivo-latin-900-normal.woff2'),
    weight: '900',
  }),
  loadFont({
    family: 'Archivo',
    url: staticFile('fontes/archivo-latin-500-normal.woff2'),
    weight: '500',
  }),
  loadFont({
    family: 'Space Mono',
    url: staticFile('fontes/space-mono-latin-400-normal.woff2'),
    weight: '400',
  }),
  loadFont({
    family: 'Space Mono',
    url: staticFile('fontes/space-mono-latin-700-normal.woff2'),
    weight: '700',
  }),
])
  .then(() => continueRender(espera))
  .catch(() => continueRender(espera));

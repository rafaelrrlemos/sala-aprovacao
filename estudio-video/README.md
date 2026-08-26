# Estudio de video

Videos verticais gerados por codigo com [Remotion](https://www.remotion.dev).
Nao tem ligacao ao `index.html` da sala de aprovacao: e uma pasta autonoma dentro
deste repositorio, que serve tambem de backup.

## Como usar

```bash
cd estudio-video
npm install
npx remotion studio                                   # editor visual, localhost:3000
npx remotion render CanonToursTikTok saidas/canon-tours-tiktok.mp4
```

O Remotion descarrega sozinho um Chrome headless na primeira renderizacao. Se ja
existir um Chrome/Chromium na maquina, pode reaproveita-lo:

```bash
npx remotion render CanonToursTikTok saidas/video.mp4 \
  --browser-executable=/caminho/para/chrome
```

Nao e preciso FFmpeg no sistema: vem um compilado dentro de `@remotion/compositor-*`.

## Composicoes

| Id | Formato | Duracao | O que e |
| --- | --- | --- | --- |
| `CanonToursTikTok` | 1080x1920, 30 fps | 27 s | Canon Tours, campanha D30 -> D01 |
| `BandaDesenhada` | 1080x1920, 30 fps | 8 s | Teste de estilo: vinhetas desenhadas por codigo |
| `EstiloLottie` | 1080x1920, 30 fps | 6 s | Teste de estilo: ficheiro Lottie tocado no video |
| `Reel` | 1080x1920, 30 fps | 9 s | Teste tecnico; texto todo por props |

## Canon Tours (`src/canon/`)

- `marca.ts` — tokens de cor e tipografia do brand book v3 (2026-07-23) e
  carregamento das fontes a partir de `public/fontes/`.
- `pecas.tsx` — folha, barra de topo, linha de cartaz, voz dactilografada,
  numero da contagem, picotado.
- `CanonTours.tsx` — os seis beats do video, um por cena.

Regras da marca que o video cumpre, e onde estao no codigo:

| Regra | Onde |
| --- | --- |
| Todo o texto em ingles | copy dentro de `CanonTours.tsx` |
| Voz escrita do tour manager, nunca falada nem pronta | `Datilografado` |
| Vermelho `#A24C3E` uma vez, so no pedido | cena `Pedido` |
| Pedido unico: SAVE ME A SEAT | cena `Pedido` |
| Numero encontrado, descentrado | `Numero` |

Copy das cenas 2, 3 e 4 vem do anexo D30 do documento de story routing.

### Duas coisas a decidir

1. **Tipografia.** O cartaz pede Helvetica Black Condensed. Aqui usa-se Archivo 900
   (+ Space Mono), que sao os fallbacks declarados no proprio logotipo e brand book.
   Com o ficheiro licenciado da Helvetica, troca-se em `marca.ts` e mais nada.
2. **Fotografia.** A marca proibe stock e manda compor o texto por cima da imagem,
   nunca dentro dela. Como nao havia fotografia disponivel, o video e tipografico
   puro. Entrando fotos, elas passam a fundo das cenas e o texto fica onde esta.

Fontes empacotadas em `public/fontes/` a partir do `@fontsource` (SIL Open Font License).

## Testes de estilo (`src/estilos/`)

Duas maneiras diferentes de meter desenho num video, para comparar:

- **`BandaDesenhada.tsx`** — tudo SVG escrito a mao: carrinha, caras, baloes,
  linhas de velocidade, trama de pontos, vinhetas que entram aos saltos e uma
  ultima que rebenta a grelha. Nao ha imagem nenhuma no projeto; se mudar o
  `fps`, o desenho continua correto. Bom para vetor plano e contorno grosso —
  mau para ilustracao detalhada ou expressao facial a serio.
- **`Lottie.tsx` + `marca-lottie.json`** — um ficheiro Lottie tocado dentro da
  composicao com `@remotion/lottie`. Este foi escrito a mao (trim paths,
  rotacao, saltos), mas o mesmo codigo toca qualquer JSON exportado do After
  Effects ou tirado do LottieFiles. O Remotion trata da folha, do texto e do
  compasso; o desenho vem do asset.

## Licenca do Remotion

O Remotion nao e MIT. E gratuito para individuos, organizacoes sem fins lucrativos
e empresas ate 3 funcionarios; acima disso exige licenca de empresa paga. Ver
`LICENSE.md` dentro de `node_modules/remotion` apos o `npm install`.

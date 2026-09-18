# Arquitetura do Frontend — SAUF.BR

Este documento explica **onde cada tipo de código deve morar** no projeto e serve
também como **modelo** para criar novas telas, componentes, hooks e chamadas de API.
Leia antes de abrir sua primeira PR.

---

## 1. Princípio central

Antes de decidir a pasta, pergunte sempre a mesma coisa:

> **Esse código sabe alguma coisa sobre o negócio do SAUF.BR (curso, universidade,
> simulado, assinatura...) ou é puramente genérico/técnico?**

- **Genérico** → não sabe o que é um "curso", daria pra copiar pra qualquer outro
  projeto React. Mora em `components/ui/`, `src/hooks/`, `lib/utils/` ou `types/`.
- **De domínio** → conhece uma regra do SAUF.BR. Mora dentro da `features/<dominio>/`
  correspondente.
- **De tela** → só existe (e só vai existir) numa página específica. Mora dentro da
  própria `pages/<Tela>/`.

Esse único critério resolve praticamente toda decisão de "onde eu coloco isso?" —
seja componente, hook, função utilitária ou chamada de API.

---

## 2. Mapa geral de pastas

```
src/
├── app/                    # bootstrap: providers, router
├── pages/                  # 1 pasta por rota — composição, quase sem lógica
│   └── <Tela>/
│       ├── <Tela>.tsx
│       ├── <Tela>.module.scss
│       └── components/     # componentes locais, cada um com seu .module.scss
├── features/               # lógica de negócio por domínio
│   └── <dominio>/
│       ├── api.ts          # chamadas HTTP (axios)
│       ├── hooks.ts        # hooks de react-query (useQuery/useMutation)
│       ├── components/     # componentes visuais do domínio, reusados em ≥2 telas
│       │   └── <Componente>/
│       │       ├── <Componente>.tsx
│       │       └── <Componente>.module.scss
│       ├── utils.ts        # regras de cálculo/formatação do domínio
│       └── types.ts        # tipos do domínio
├── components/
│   └── ui/                 # componentes 100% genéricos (Button, Badge, Modal...)
│       └── <Componente>/
│           ├── <Componente>.tsx
│           └── <Componente>.module.scss
├── hooks/                  # hooks 100% genéricos (useDebounce, useMediaQuery...)
├── lib/
│   ├── api/                # cliente axios único, config de endpoints
│   └── utils/               # funções utilitárias genéricas (formatarMoeda, etc.)
├── routes/                 # guards de rota (PrivateRoute, SubscriberRoute)
├── styles/                 # Sass global — variáveis, mixins, reset (ver seção 5)
└── types/                  # tipos genéricos, compartilhados entre domínios
```

---

## 3. `pages/` vs `features/`

- **`pages/`** é a casca da rota: decide *o que aparece* e *em que ordem*, mas não
  sabe *como* os dados são buscados nem *como* um card é renderizado por dentro.
- **`features/`** é o conteúdo: chamadas à API, hooks de dados e componentes que
  pertencem a um domínio de negócio.

Uma página quase sempre importa pedaços de várias features ao mesmo tempo:

```tsx
// pages/Home/Home.tsx
function Home() {
  const { data: recomendados } = useCursosRecomendados();   // features/cursos
  const { data: prazos } = useProximosPrazos();               // features/calendario
  const { data: notificacoes } = useNotificacoesNaoLidas();   // features/notificacoes

  return (
    <>
      <HeroBusca />
      <PainelPrazos prazos={prazos} />
      <SecaoCursos titulo="Continue de onde parou" cursos={recomendados} />
    </>
  );
}
```

Se o card de curso fosse implementado dentro de cada página que o usa (Home,
`/cursos`, Favoritos, resultado do Teste vocacional), teríamos 4 versões divergindo
com o tempo. Por isso ele mora uma única vez em `features/cursos/components/CursoCard.tsx`,
e cada página só importa.

---

## 4. Componentes — a regra dos 3 usos

Existe uma tendência natural de, ao criar um componente específico, já tentar
generalizá-lo "pra reaproveitar depois". Isso é **abstração prematura** e costuma
sair mais caro do que resolve — você está adivinhando um formato genérico sem ainda
saber quais são os outros casos de uso reais.

A regra prática que evita isso:

1. **1º uso**: escreva o componente direto dentro da página que precisa dele, sem se
   preocupar em generalizar.
2. **2º uso** (parecido, em outra tela): copie e ajuste. Ainda não abstraia.
3. **3º uso**, ou quando o padrão ficar óbvio: **promova** o componente para
   `features/<dominio>/components/` (se for de domínio) ou `components/ui/` (se for
   puramente visual/genérico), com uma API que cubra os casos reais que você já viu —
   não os que imagina que vão aparecer.

**Exemplo real do projeto:** "Aproveitamento médio", "Questões respondidas",
"Simulados concluídos" (Meu acompanhamento), "Simulados feitos" (aba Simulados) e as
métricas do Cronômetro são todos o mesmo padrão visual — número grande + rótulo +
variação (▲/▼). Isso é candidato natural a `components/ui/StatCard.tsx`: não porque
foi planejado como genérico, mas porque apareceu 3+ vezes organicamente.

### Onde fica o componente que só existe numa tela

```
pages/
└── TesteVocacional/
    ├── TesteVocacionalPerguntas.tsx
    └── components/
        └── ProgressoGrid.tsx      ← só existe aqui, fica local
```

Exemplos legítimos de componente que **não deve** virar genérico: o grid de
progresso do Teste vocacional, o heatmap "Quadro de ofensivas" do Cronômetro, o
pódio de 3 avatares do Ranking. São visuais específicos demais pra generalizar sem
necessidade real.

---

## 5. Estilização (CSS Modules + Sass)

Mesma lógica de 3 níveis que já usamos para os outros itens — só que aqui o
critério não é "sabe sobre negócio", é **"esse estilo é reaproveitado entre
componentes ou é exclusivo de um só?"**

- **Estilo de um componente** → arquivo `.module.scss` **co-localizado ao lado do
  componente**, com o mesmo nome, não importa em qual nível ele esteja
  (`components/ui/`, `features/<dominio>/components/` ou `pages/<Tela>/components/`):

  ```
  components/ui/Button/
  ├── Button.tsx
  └── Button.module.scss

  features/cursos/components/CursoCard/
  ├── CursoCard.tsx
  └── CursoCard.module.scss
  ```

  E importado só ali, com escopo local automático do CSS Modules:

  ```tsx
  import styles from './Button.module.scss';

  <button className={styles.button}>Entrar</button>
  ```

- **Variáveis, mixins e reset global** (cores, espaçamentos, breakpoints,
  tipografia) → `styles/` na raiz de `src/`, nunca dentro de um componente:

  ```
  styles/
  ├── _variables.scss     # cores, espaçamentos, breakpoints
  ├── _mixins.scss        # mixins reutilizáveis (ex.: flex-center, truncate)
  └── global.scss          # reset + import de variables/mixins, importado 1x no main.tsx
  ```

  Cada `.module.scss` que precisar de uma variável ou mixin importa de lá com
  `@use`, em vez de redeclarar valores soltos:

  ```scss
  // Button.module.scss
  @use '../../../styles/variables' as *;

  .button {
    background: $color-primary;
    padding: $spacing-md;
  }
  ```

**Regra fixa, sem exceção:** nunca criar CSS/Sass solto fora do padrão
`.module.scss` (exceto os arquivos globais dentro de `styles/`). Um `.scss` sem
Modules vaza estilo global pro resto do app — é exatamente o problema que o CSS
Modules existe para evitar.

---

## 6. Exceção importante: a camada de API não segue a regra dos 3 usos

Diferente de componente visual, **chamada HTTP nunca nasce dentro de `pages/`** —
nem na primeira vez que é usada. Uma chamada de API quase sempre acaba precisando
ser reaproveitada, cacheada pelo `react-query`, ou testada isoladamente, e misturar
isso dentro do componente de página dificulta tudo isso desde o primeiro dia.

**Regra:** `api.ts` e os hooks de `react-query` (`useQuery`/`useMutation`) sempre
nascem direto dentro da `features/<dominio>/` correspondente, **mesmo que hoje só
uma tela use aquele dado.**

```
features/simulados/
├── api.ts        # getSimulados(), getSimuladoById(id), criarSimulado(config)
└── hooks.ts       # useSimulados(), useSimulado(id), useCriarSimulado()
```

Uma página nunca importa `axios` diretamente — ela importa o hook.

---

## 7. Hooks

Mesma lógica de 3 níveis dos componentes, mas **sem** a regra dos 3 usos para hooks
de dados (eles seguem a regra da seção 6 acima).

| Nível | Onde mora | Exemplo |
|---|---|---|
| Genérico | `src/hooks/` | `useDebounce`, `useMediaQuery`, `useOnClickOutside` |
| De domínio | `features/<dominio>/hooks.ts` | `useCursos()`, `useFavoritos()`, `useSimuladoEmAndamento()` |
| De tela | dentro da própria `pages/<Tela>/` | `useProgressoTesteVocacional()` |

Hooks genéricos não sabem nada do domínio — são reaproveitáveis em qualquer projeto
React. Exemplo concreto: os campos de busca da Home, de Universidades e de Cursos
vão precisar de debounce para não disparar uma request a cada tecla digitada. Isso é
`useDebounce`, e mora em `src/hooks/useDebounce.ts`.

---

## 8. Utils

- **Genérico** → `lib/utils/` — `formatarMoeda()`, `formatarData()`,
  `truncarTexto()`. Não sabem nada sobre o SAUF.BR.
- **De domínio** → dentro da própria feature — por exemplo, a lógica de "Sua chance
  estimada" (compara a nota do ENEM do usuário com o corte do curso) é regra de
  negócio de curso, então vira `features/cursos/utils.ts` (`calcularChanceEstimada()`).

---

## 9. Types

- **Genérico** → `types/` — `type ApiError = { message: string; status: number }`,
  `type Paginado<T> = { items: T[]; total: number; page: number }`.
- **De domínio** → dentro da feature — `type Curso`, `type Universidade`,
  `type Simulado` moram em `features/cursos/types.ts`, `features/universidades/types.ts`
  etc.

---

## 10. Checklist de decisão rápida

Ao escrever qualquer código novo, siga esta ordem:

1. **É uma chamada HTTP ou hook de dados (`useQuery`/`useMutation`)?**
   → Vai direto para `features/<dominio>/api.ts` ou `hooks.ts`. Sem exceção, sem
   regra dos 3 usos.
2. **Esse código sabe algo sobre curso/universidade/simulado/assinatura/etc.?**
   - Não → é genérico → `components/ui/`, `src/hooks/`, `lib/utils/` ou `types/`.
   - Sim → é de domínio → dentro da `features/<dominio>/` correspondente.
3. **(Só para componentes visuais de domínio) Isso já apareceu em 2-3 telas
   diferentes organicamente?**
   - Ainda não → deixe local em `pages/<Tela>/components/`.
   - Sim → promova para `features/<dominio>/components/`.
4. **(Só para componentes 100% visuais, sem nenhuma regra de negócio) Já apareceu
   em 2-3 lugares com a mesma estrutura?**
   - Sim → promova para `components/ui/`.
5. **É estilo (CSS)?**
   → Sempre `.module.scss` ao lado do componente que ele estiliza. Valor
   reaproveitável entre vários componentes (cor, espaçamento, breakpoint) → vai
   para `styles/_variables.scss` ou `styles/_mixins.scss`, nunca duplicado.

---

## 11. Modelo: como criar uma nova tela

Exemplo: criar a tela `UniversidadeDetalhe`.

1. Crie a pasta `pages/UniversidadeDetalhe/` com o componente principal
   (`UniversidadeDetalhe.tsx`).
2. Verifique se a feature `features/universidades/` já existe. Se não, crie com
   `api.ts`, `hooks.ts`, `components/`, `types.ts`.
3. Adicione em `features/universidades/api.ts` a chamada necessária
   (`getUniversidadeById(id)`).
4. Adicione em `features/universidades/hooks.ts` o hook correspondente
   (`useUniversidade(id)`), usando `useQuery`.
5. Na página, importe o hook e monte o layout — a página só compõe, não busca dado
   diretamente do axios.
6. Registre a rota em `app/router.tsx`. Se a tela exigir login ou assinatura,
   envolva com `PrivateRoute` ou `SubscriberRoute` (ver `routes/`).
7. Se algum trecho visual for específico só dessa tela (ex.: o "Onde fica" com
   mapa), crie em `pages/UniversidadeDetalhe/components/`. Se for reaproveitável
   (ex.: o card de universidade, já usado em `/universidades` e em Favoritos), ele
   deve estar em `features/universidades/components/`.

---

## 12. Modelo: como criar um novo componente

1. Pergunte: **ele sabe algo do domínio?**
   - Não sabe nada (ex.: um `Tooltip` genérico) → `components/ui/`.
   - Sabe, mas só é usado nessa tela → `pages/<Tela>/components/`.
   - Sabe e já é usado (ou claramente será) em mais de uma tela → `features/<dominio>/components/`.
2. Crie os dois arquivos juntos, na mesma pasta, com o mesmo nome: `Componente.tsx`
   e `Componente.module.scss` (ver seção 5). Nunca crie o `.tsx` sem o `.module.scss`
   correspondente, mesmo que o estilo inicial seja mínimo.
3. Nomeie de forma específica o suficiente para não confundir com outro nível — por
   exemplo, `CursoCard` (domínio) vs `Card` (genérico, só o wrapper visual de borda
   e sombra, sem saber o que tem dentro).
4. Não adicione props "pensando no futuro". Só generalize quando o 3º uso real
   aparecer (ver seção 4).

---

## 13. Modelo: como criar uma nova chamada de API / hook de dados

1. Vá direto para `features/<dominio>/api.ts` — nunca escreva `axios.get(...)`
   dentro de uma página, mesmo que hoje só uma tela use esse dado.
2. Escreva a função pura primeiro, sem React:
   ```ts
   // features/simulados/api.ts
   export async function getSimulados() {
     const { data } = await apiClient.get<Simulado[]>('/simulados');
     return data;
   }
   ```
3. Envolva com o hook de `react-query` em `hooks.ts`:
   ```ts
   // features/simulados/hooks.ts
   export function useSimulados() {
     return useQuery({ queryKey: ['simulados'], queryFn: getSimulados });
   }
   ```
4. Na página (ou no componente de domínio), importe só o hook:
   ```ts
   const { data: simulados, isLoading } = useSimulados();
   ```

---

## 14. Resumo em uma frase

**Página compõe, feature contém, `ui`/`hooks`/`lib`/`types` genéricos não sabem que
o SAUF.BR existe, chamada de API nunca mora numa página nem na primeira vez — e todo
componente carrega seu `.module.scss` ao lado, nunca CSS global solto.**

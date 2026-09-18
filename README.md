# SAUF.BR — Frontend

Frontend do **SAUF.BR**, uma plataforma gratuita de orientação acadêmica. O usuário
pode explorar cursos, universidades, formas de ingresso (PROUni, SISU, FIES, ENEM) e
o calendário de vestibulares sem precisar de login, além de fazer um teste
vocacional e treinar com simulados (recurso pago, por assinatura).

Este repositório é só o frontend (SPA). Ele consome dados de uma **API Java (Spring
Boot)** desenvolvida separadamente.

## Principais regras de acesso

- Navegação (cursos, universidades, formas de ingresso, calendário) é livre, sem
  login.
- O **Teste vocacional** exige login para responder as perguntas.
- Os **Simulados** exigem assinatura ativa (planos Basic/Plus/Premium).

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [react-router-dom](https://reactrouter.com) — roteamento
- [@tanstack/react-query](https://tanstack.com/query) — estado de dados vindos da API
- Context API — estado global de sessão (usuário logado, assinatura ativa)
- [axios](https://axios-http.com) — cliente HTTP
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev) — formulários e validação
- [Sass](https://sass-lang.com) + CSS Modules — estilização, com escopo local por componente (`Componente.module.scss`)

## Pré-requisitos

- Node.js 18 ou superior
- npm (ou pnpm/yarn, ajustando os comandos abaixo)
- A API Java rodando localmente (ou uma URL de ambiente já disponível)

## Como rodar o projeto

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo de variáveis de ambiente de exemplo e ajuste a URL da API:
   ```bash
   cp .env.example .env
   ```
3. Suba o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173`.

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_URL` | URL base da API Java | `http://localhost:8080/api` |

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor local com hot reload |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente o build de produção, para conferência |
| `npm run lint` | Roda o ESLint no projeto |

## Estrutura do projeto

O código é organizado por **feature/domínio**, não por tipo de arquivo:

```
src/
├── app/          # bootstrap: providers, router
├── pages/        # telas (rotas) — composição, sem lógica de negócio
├── features/     # lógica de negócio por domínio (api, hooks, components, types)
├── components/   # componentes de UI genéricos
├── hooks/        # hooks genéricos, sem regra de negócio
├── lib/          # cliente HTTP, utils genéricos
├── routes/       # guards de rota (PrivateRoute, SubscriberRoute)
└── types/        # tipos globais
```

Antes de criar uma tela, componente, hook ou chamada de API nova, veja o guia
completo em [`ARQUITETURA.md`](./ARQUITETURA.md) — ele explica onde cada tipo de
código deve morar e traz um passo a passo pronto para cada caso.

## Documentação adicional

- [`ARQUITETURA.md`](./ARQUITETURA.md) — guia de organização do código
- `docs/` — ADRs e demais decisões de arquitetura registradas ao longo do projeto

# Padrão de Commits — SAUF.BR

## Título (obrigatório)

Todo commit deve começar no formato:

```
tipo-CODIGOCARD - mensagem no imperativo
```

- **tipo**: categoria da mudança (ver tabela abaixo).
- **CODIGOCARD**: o mesmo código que aparece no nome da branch criada
  automaticamente pelo Jira. Exemplo: a branch `TR-197-inicializacao-do-projeto-web`
  vira o código `TR197` no commit.

**Exemplos:**

```
feat-TR197 - adição do fluxo de login
chore-TR192 - inicialização do projeto
fix-TR205 - corrige contagem de questões em branco no simulado
```

### Tipos disponíveis

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade visível (nova tela, novo botão, novo fluxo) |
| `fix` | Correção de bug |
| `docs` | Só documentação (README, comentários, ADRs) |
| `chore` | Setup, configs, dependências, tarefas de manutenção |
| `refactor` | Muda a estrutura do código sem mudar comportamento |
| `style` | Formatação/lint, sem mudar lógica |
| `test` | Adiciona ou ajusta testes |

## Descrição (opcional, mas recomendada)

A descrição **não é obrigatória em todo commit** — só o título é. Mas é uma boa
prática incluir quando pelo menos uma dessas situações se aplica:

- A mudança não é óbvia olhando o diff (por que essa solução e não outra).
- É a implementação de uma decisão registrada num ADR — vale referenciar (`Ref: ADR-006`).
- É um `fix` não trivial — vale explicar a causa raiz, não só o sintoma corrigido.
- A mudança quebra algo (breaking change) ou tem efeito colateral em outra parte do sistema.

Nesses casos, escreva a descrição embaixo do título, separada por uma linha em
branco:

```
fix-TR205 - corrige contagem de questões em branco no simulado

Questões puladas via "Deixar em branco" não estavam sendo contadas
como erro na média de acertos, divergindo do cálculo mostrado na
tela de revisão. Ajustado o cálculo em useResultadoSimulado para
tratar em_branco === erro, conforme especificado.
```

Para mudanças simples (typo, ajuste de estilo, config pontual), o título sozinho
já é suficiente.

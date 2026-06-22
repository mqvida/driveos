# SETUP — DriveOS no Claude Code

Passo a passo para sair do zero. Tempo do passo 0: ~1h.

## Passo 0 — Instalar e inicializar
```bash
# 1. Instalar o Claude Code (precisa de Node.js)
npm install -g @anthropic-ai/claude-code

# 2. Criar o repositório e entrar nele
mkdir driveos && cd driveos && git init

# 3. Copiar este kit para a raiz do repo:
#    CLAUDE.md
#    .claude/agents/code-reviewer.md
#    .claude/agents/researcher.md
#    .claude/skills/lgpd-checklist/SKILL.md

# 4. Abrir o Claude Code
claude

# 5. Dentro do Claude Code, gerar o complemento do CLAUDE.md a partir do código
#    (depois que houver código). Por enquanto, use o CLAUDE.md do kit.
/init
```

## Passo 1 — Conectar MCP (acesso real a repo e banco)
No Claude Code, conecte o que você vai usar de verdade:
- GitHub (PRs, issues)
- PostgreSQL (o Claude consulta o schema real em vez de adivinhar)
- (depois) Linear ou Notion para tarefas

## Passo 2 — Verificar a memória automática
```
/memory          # confira que a auto memory está ligada (v2.1.59+)
claude --version # precisa ser >= 2.1.59 para auto memory
```
A auto memory deixa o Claude acumular aprendizados de build/debug entre sessões,
sem você escrever nada. O CLAUDE.md é o que VOCÊ fixa; a auto memory é o que ELE aprende.

## Passo 3 — Andaime do monorepo
Peça ao Claude (em linguagem natural):
> "Crie um monorepo pnpm com apps/mobile (Expo RN + TS), apps/web (Next.js),
> apps/api (NestJS + Prisma), packages/shared. Configure Vitest e ESLint estrito.
> Siga o CLAUDE.md."

## Passo 4 — O wedge (nesta ordem)
1. Comparador multimarca (catálogo + filtro)
2. Agendamento (agenda da loja + confirmação)
3. **Captura de sensores durante o test-drive** (expo-location + expo-sensors)
4. **Relatório do drive + follow-up de IA** (Claude API)
5. Score de qualidade da loja (cliente oculto automatizado)

## Como usar os subagents (economia de token)
- Pesquisa pesada: `> use o subagent researcher para investigar ...`
- Antes de PR: `> use o subagent code-reviewer no diff staged`
Eles rodam em janela de contexto separada — a sessão principal fica limpa.

## Lembrete de tokens
- CLAUDE.md curto (paga imposto todo turno).
- Rotinas repetíveis = skills (custo zero até usar).
- Trabalho pesado = subagents (isola o contexto).

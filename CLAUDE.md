# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# DriveOS — Marketplace de Test-Drive (memória do projeto)

> Mantenha este arquivo CURTO. Ele é carregado em toda sessão e custa tokens a cada turno.
> Regras "às vezes" vão para skills (.claude/skills); trabalho pesado vai para subagents.

## O que é
Marketplace multimarca, focado no consumidor, para comparar veículos e agendar test-drives.
Diferencial central e defensável: o celular do cliente vira sensor durante o test-drive
(GPS, rota, acelerômetro) → relatório personalizado + follow-up de IA. SEM hardware no carro.
Modelo: gratuito p/ consumidor; assinatura + taxa de sucesso p/ concessionária (B2B2C).

## Fora de escopo no MVP (NÃO construir — exige parceria com a montadora)
- Unlock do carro por BLE / chave digital
- Test-drive remoto em AR controlando o veículo físico
- Telemetria via OBD-II
- Biometria/liveness integrada a birôs de crédito
Se eu pedir qualquer um destes, lembre que é backlog de fase 3 e confirme antes.

## Stack (TypeScript ponta a ponta)
- Mobile: React Native (Expo). Sensores: expo-location, expo-sensors.
- Web: Next.js (App Router).
- API: NestJS. ORM: Prisma. Banco: PostgreSQL + PostGIS (geo).
- IA: Claude API (follow-up + chatbot). WhatsApp: integrar BSP existente na fase 1.
- Monorepo: pnpm workspaces. Pastas: apps/mobile, apps/web, apps/api, packages/shared.

## Convenções
- Tudo em TypeScript estrito. Sem `any` sem justificativa em comentário.
- Commits: Conventional Commits (feat:, fix:, chore:, docs:).
- Nunca commitar segredos. .env nunca entra no git. Use .env.example.
- Testes: Vitest. Toda rota de API nova tem teste de caminho feliz + 1 erro.
- Mensagens de UI em pt-BR; código e identificadores em inglês.

## LGPD — INEGOCIÁVEL
Coletamos localização e comportamento de condução de pessoas identificáveis = dado sensível.
- Nenhum dado pessoal é coletado sem consentimento explícito e finalidade declarada.
- Minimização: só colete o que o relatório de fato usa.
- Toda mudança que toque dado pessoal dispara a skill `lgpd-checklist` antes do commit.

## Antes de escrever código
Para tarefas grandes, use o subagent `researcher` para explorar; mantenha esta sessão limpa.
Para revisar PR, use o subagent `code-reviewer`.

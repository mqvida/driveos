---
name: lgpd-checklist
description: Checklist de conformidade LGPD para o DriveOS. Use SEMPRE que a tarefa coletar, armazenar, transmitir ou exibir dado pessoal — especialmente localização, dados de sensor/condução, CNH, telefone, e-mail ou qualquer identificador. Dispara antes de finalizar qualquer mudança que toque esses dados.
---

# Checklist LGPD — DriveOS

Dado de localização + comportamento de condução de pessoa identificável é dado pessoal
(e pode ser sensível). É o maior ativo e a maior exposição jurídica do projeto.
Rode este checklist antes de concluir a mudança. Qualquer "não" vira item bloqueante.

## 1. Base legal e consentimento
- [ ] Há consentimento explícito e granular ANTES da coleta? (não pré-marcado)
- [ ] A finalidade está declarada em linguagem clara para o usuário?
- [ ] O usuário consegue revogar o consentimento e apagar os dados (direito do titular)?

## 2. Minimização
- [ ] Estou coletando apenas o que o relatório/feature de fato usa?
- [ ] A precisão da localização é a mínima necessária? (ex.: agregada quando der)
- [ ] Há retenção definida (TTL) — o dado não fica para sempre "por via das dúvidas"?

## 3. Segurança e fluxo
- [ ] Dado pessoal em trânsito e em repouso está criptografado?
- [ ] Não vai para logs, mensagens de erro, analytics de terceiros ou prompts de IA sem base legal?
- [ ] Acesso restrito por papel (cliente vê o seu; loja vê o necessário)?

## 4. Compartilhamento com a concessionária / IA
- [ ] O que é enviado à concessionária e à API de IA está coberto pela finalidade consentida?
- [ ] Há contrato/encarregado (DPO) e registro de operações de tratamento?

## Saída
Liste o que passou, o que falhou e a correção mínima de cada falha.
Lembrete: isto orienta a engenharia; decisões finais de conformidade devem ser
validadas por um advogado especializado em LGPD.

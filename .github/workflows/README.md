# GitHub Actions - CI Pipeline

## 📋 Visão Geral

Este diretório contém os workflows de Integração Contínua (CI) do projeto.

## 🚀 Workflow: `ci.yml`

### Gatilho (Trigger)
- Disparado automaticamente quando um **Pull Request** é aberto ou atualizado com destino à branch `main`

### Jobs

#### 1. `test-client` - Testes do Frontend (Next.js)

**Ambiente:**
- Ubuntu latest
- Node.js 20
- Next.js dev server

**Testes Executados:**

| Tipo | Framework | Comando | Descrição |
|------|-----------|---------|-----------|
| 📦 Caixa Branca | Jest | `npm test` | Unitários e integração |
| ⬛ Caixa Preta | Playwright | `npx playwright test` | E2E no frontend |

**Arquivos produzidos:**
- `playwright-report-client/` - Relatório HTML dos testes E2E
- `coverage-client/` - Relatório de cobertura (Jest)

---

#### 2. `test-api` - Testes do Backend (Spring Boot)

**Ambiente:**
- Ubuntu latest
- Java 21 (Temurin)
- MySQL 8.0 (container Docker)
- Maven

**Testes Executados:**

| Tipo | Framework | Comando | Descrição |
|------|-----------|---------|-----------|
| 📦 Caixa Branca | JUnit | `./mvnw test` | Unitários e integração |
| ⬛ Caixa Preta | Playwright | `npx playwright test` | Testes de API HTTP |

**Arquivos produzidos:**
- `junit-report-api/` - Relatório XML dos testes JUnit
- `playwright-report-api/` - Relatório HTML dos testes de API
- `api-server-logs/` - Logs do servidor Spring Boot

---

## 📊 Estrutura dos Testes

```
sqa-social-media/
├── .github/
│   └── workflows/
│       ├── ci.yml          ← Workflow de CI
│       └── README.md       ← Este arquivo
├── client/
│   ├── tests/
│   │   ├── caixaBranca/    ← Testes unitários/integração (Jest)
│   │   └── caixaPreta/     ← Testes E2E (Playwright)
│   └── jest.config.ts
└── api/
    ├── tests/
    │   ├── caixaPreta/     ← Testes de API HTTP (Playwright)
    │   └── src/test/       ← Testes unitários/integração (JUnit)
    └── pom.xml
```

---

## 🔍 Como Visualizar os Resultados

### No GitHub Actions:
1. Acesse a aba **Actions** no repositório
2. Selecione o workflow run desejado
3. Veja os logs em tempo real e os artefatos gerados

### Artefatos (Artifacts):
Cada job gera artefutos disponíveis para download por 7 dias:
- Relatórios de teste (HTML e XML)
- Logs dos servidores
- Cobertura de código

---

## ⚙️ Variáveis de Ambiente

| Variável | Uso | Valor padrão |
|----------|-----|-------------|
| `CI` | Indica ambiente CI | `true` (automático) |
| `MYSQL_DATABASE` | Nome do DB | `social_media` |
| `MYSQL_ROOT_PASSWORD` | Senha root MySQL | `root` |

---

## 📝 Próximas Melhorias Possíveis

- [ ] Adicionar notificação de resultados (Slack/Discord)
- [ ] Configurar badge de status no README
- [ ] Adicionar métricas de cobertura
- [ ] Paralelizar testes entre jobs
- [ ] Adicionar stage de deployment

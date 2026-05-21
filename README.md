# Gerenciador de Tarefas

Aplicação de gerenciamento de tarefas com frontend em React e backend em Node.js/Express.

## Visão geral

Este projeto implementa uma API RESTful de tarefas e uma interface web para criar, editar, concluir e excluir tarefas. O armazenamento é em memória para facilitar a avaliação do teste sem dependência de banco de dados.

## Tecnologias

- Backend: Node.js, Express, CORS, Jest, Supertest
- Frontend: React, Vite, Axios, CSS Modules
- Qualidade: ESLint, Prettier
- CI: GitHub Actions

## Estrutura do projeto

- `backend/`
  - `src/routes/` - rotas da API
  - `src/controllers/` - lógica de manipulação de requisições
  - `src/models/` - modelo de dados em memória
  - `src/middleware/` - tratamento de erros
  - `test/` - testes de integração
- `frontend/`
  - `src/pages/` - páginas da aplicação
  - `src/components/` - componentes de interface
  - `src/services/` - serviço de consumo da API

## Funcionalidades

- CRUD completo para tarefas via `POST`, `GET`, `PUT` e `DELETE`
- Validação de título obrigatório em criação e atualização
- Respostas de erro JSON com código 400 e 404 quando aplicável
- Lista de tarefas com marcação de concluída e exclusão
- Formulário para criar e editar tarefas
- Feedback visual para erros e mensagens de sucesso

## Pré-requisitos

- Node.js 22+ instalado
- Git instalado

## Como executar localmente

### 1. Backend

```bash
cd backend
npm install
npm start
```

A API ficará disponível em `http://localhost:3001`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend será executado em `http://localhost:5173`.

> O backend deve estar rodando antes do frontend para que a aplicação funcione corretamente.

## Testes

### Backend

```bash
cd backend
npm test
```

O projeto inclui testes de integração com Jest e Supertest para os endpoints da API.

## Lint e formatação

### Backend

```bash
cd backend
npm run lint
npm run lint:fix
npm run format
```

### Frontend

```bash
cd frontend
npm run lint
npm run lint:fix
npm run format
```

## CI / GitHub Actions

O repositório possui um workflow em `.github/workflows/ci.yml` que executa:

- `backend-tests` — instala dependências e roda os testes do backend
- `frontend-build` — instala dependências e faz build do frontend

## Observações

- O backend usa armazenamento em memória e não persiste dados entre reinícios.
- A URL base da API usada pelo frontend é `http://localhost:3001/api`.
- O código foi estruturado para facilitar revisão e atender aos requisitos do teste de estágio.

## Como contribuir

1. Crie um branch novo a partir de `master`
2. Faça as alterações necessárias
3. Execute os testes localmente
4. Abra um pull request com as mudanças

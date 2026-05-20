# Gerenciador de Tarefas

Aplicação de gerenciamento de tarefas.

## Estrutura do projeto

- `backend/` - API Node.js + Express
- `frontend/` - aplicativo React criado com Vite

## Tecnologias

- Backend: Node.js, Express, CORS
- Frontend: React, Vite, Axios, CSS Modules

## Funcionalidades implementadas

- API RESTful `/api/tasks` com operações CRUD
- Armazenamento em memória (conforme pedido no teste)
- Validação de título obrigatório em `POST` e `PUT`
- Tratamento de erros com respostas JSON
- Frontend que lista tarefas, cria, edita, alterna status e exclui tarefas
- Interface responsiva e visual limpa

## Como rodar

### 1. Backend

```bash
cd backend
npm install
npm start
```

A API será iniciada em `http://localhost:3001`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend será aberto em `http://localhost:5173`.

## Observações importantes

- O backend deve estar rodando antes do frontend.
- O frontend consome os endpoints do backend em `http://localhost:3001/api/tasks`.
- Não há banco de dados; os dados são mantidos em memória.

## Status do teste

O projeto está alinhado com o requisito do teste:

- Backend em Node.js + Express
- Servidor na porta `3001`
- CORS configurado
- Pastas `routes/`, `controllers/`, `models/`
- Endpoints `GET`, `POST`, `PUT`, `DELETE` para `/api/tasks`
- Validações de título e erros 400/404
- Frontend React com Vite, estrutura de componentes e serviço de API

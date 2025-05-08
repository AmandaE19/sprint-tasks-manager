# 🚀 SprintTasker - Backend (NestJS + GraphQL)

**SprintTasker** é o backend de uma plataforma de **gestão de tarefas com metodologia Scrum**. O sistema organiza tarefas por **sprints**, e cada sprint possui um quadro **Kanban** com colunas `To Do`, `Doing` e `Done`.

Este repositório representa o backend criado com **NestJS** e **GraphQL (Apollo Server)** no modelo code-first.

---

## 🧠 Visão Geral

### Funcionalidades principais

- 📆 **Sprints**: Cada sprint é uma instância com data de início/fim, e possui seu próprio quadro Kanban.
- ✅ **Tarefas**: São associadas a uma sprint, possuem status, responsável e descrição.
- 👥 **Usuários**: Existem dois tipos:
  - `COMMON`: Pode visualizar e mover tarefas para si.
  - `ADMIN`: Tem as permissões de COMMON, e também pode criar, editar e excluir tarefas e sprints.

### Páginas do sistema

- **Página 1 (todos os usuários)**:
  - Visualizar sprints ativas ou inativas (utilizar filtros).
  - Somente tarefas da sprint ativa podem ter status alterados por um usuário `COMMON`.
  - Para cada sprint, visualizar tarefas divididas por status (`To Do`, `Doing`, `Done`).
  - Marcar tarefas como `Doing` ou `Done`.
  - Atribuir uma tarefa para si.

- **Página 2 (ADM apenas)**:
  - Criar novas sprints.
  - Criar, editar ou excluir tarefas de qualquer sprint.

---

## ⚙️ Tecnologias utilizadas

- **NestJS** – Estrutura do backend.
- **GraphQL (Apollo Server)** – API em GraphQL code-first.
- **TypeScript** – Tipagem robusta.
- **JWT (autenticação)** – Proteção de rotas (a implementar).
- **MongoDB + Mongoose** – Banco de dados NoSQL.
- **Class-validator** – Validação de dados.
- **Bcrypt** – Hash de senhas.

---

## 🧾 Estrutura da API GraphQL

### 📌 Tipos principais (Schemas)

#### `User`
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  role: Role! # ADMIN | COMMON
}
```

#### `Sprint`
```graphql
type Sprint {
  id: ID!
  name: String!
  initialDate: String!
  finalDate: String!
  tasks: [Task!]!
}
```

#### `Task`
```graphql
type Task {
  id: ID!
  name: String!
  description: String!
  status: String! # TODO | DOING | DONE
  assignedTo: User
  sprint: Sprint!
}
```

## 🧾 Queries
Descrever (a fazer)

## 🔐 Autenticação (a implementar)

- Login com email e senha.
- Recebimento de token JWT.
- Middleware que protege rotas de acordo com o `role` do usuário (`ADMIN` ou `COMMON`).
- Exemplo esperado de fluxo:
  1. Usuário envia email e senha via mutation `login`.
  2. Backend valida e retorna um JWT.
  3. Esse token é incluído no header `Authorization` nas próximas requisições GraphQL.
  4. O backend valida o token e aplica regras de acesso (guards).

---

## 🧪 Como rodar o projeto localmente

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/sprint-tasker-backend.git

# Acesse o diretório
cd sprint-tasker-backend

# Instale as dependências
npm install

# Rode o projeto
npm run start:dev

# O servidow GraphQL estará disponível em:
http://localhost:3000/graphql
```

## 🔗 Integração com o frontend

Para consumir essa API GraphQL no frontend (React, Vue, etc.), recomenda-se utilizar:

- `@apollo/client` – Cliente Apollo para GraphQL
- `graphql` – Biblioteca base
- `graphql-tag` – Para uso com templates de queries

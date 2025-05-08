# 🚀 SprintTasker - Backend (NestJS + REST API)

**SprintTasker** é o backend de uma plataforma de gestão de tarefas com base na metodologia **Scrum**. O sistema organiza tarefas por sprints, cada uma com seu próprio quadro Kanban dividido em **To Do**, **Doing** e **Done**.

---

## 🧠 Visão Geral

### Funcionalidades principais

- **📆 Sprints**  
  Cada sprint tem data de início e fim, e seu próprio quadro de tarefas.

- **✅ Tarefas**  
  Associadas a uma sprint, com status (`TODO`, `DOING`, `DONE`), responsável e descrição.

- **👥 Usuários**
  - `COMMON`: Visualiza e movimenta tarefas para si.
  - `ADMIN`: Pode criar, editar e excluir tarefas e sprints, além das permissões de COMMON.

---

### 📄 Páginas esperadas

#### Página 1 - Todos os usuários
- Visualizam sprints (ativas ou inativas) com filtros.
- Visualizam tarefas organizadas por status.
- Podem mover tarefas da sprint ativa para *Doing* ou *Done*.
- Podem se atribuir a tarefas.

#### Página 2 - Apenas ADMIN
- Criam novas sprints.
- Criam, editam e excluem tarefas de qualquer sprint.

---

## ⚙️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) – Framework principal do backend
- **REST API** – Comunicação via HTTP
- **TypeScript** – Tipagem robusta
- **MongoDB + Mongoose** – Banco de dados NoSQL
- **JWT** – Autenticação e controle de acesso
- **Bcrypt** – Hash de senhas
- **Class-validator** – Validação de dados

---

## 🔐 Autenticação (a implementar)

- Login com email e senha.
- Recebimento de token JWT.
- Middleware que protege rotas de acordo com o `role` do usuário (`ADMIN` ou `COMMON`).
- Exemplo esperado de fluxo:
  1. Usuário envia email e senha via HTTP para o endpoint `auth/login`.
  2. Backend valida e retorna um JWT.
  3. Esse token é incluído no header `Authorization` nas próximas requisições.
  4. O backend valida o token e aplica regras de acesso (guards).

---

## 🧪 Como rodar o projeto localmente

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/sprint-tasker-manager.git

# Acesse o diretório
cd sprint-tasker-manager

# Instale as dependências
npm install

# Rode o projeto
npm run start:dev

# O servidow GraphQL estará disponível em:
http://localhost:8080/
```

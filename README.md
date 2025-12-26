# AgendaFit – API

API REST desenvolvida para o sistema AgendaFit, responsável pelo gerenciamento de alunos.

---

## 🔧 Tecnologias utilizadas
- Node.js
- Express
- SQLite
- JavaScript

---

## ▶️ Como executar o projeto

```bash
npm install
node backend/server.js
Servidor disponível em:
http://localhost:3000

---

## 📌 Endpoints da API

### 🔹 GET /alunos
Retorna todos os alunos cadastrados.

**Método**
GET

**URL**
http://localhost:3000/alunos

**Resposta (200)**
```json
[{"id":1,"nome":"teste","telefone":"7887776565","email":"hjguygujygfuy"},{"id":2,"nome":"teste","telefone":"7887776565","email":"hjguygujygfuy"},{"id":3,"nome":"teste","telefone":"333333333","email":"teste"}]

### 🔹 POST /alunos
Cadastra um novo aluno no sistema.

**Método**
POST

**URL**
http://localhost:3000/alunos
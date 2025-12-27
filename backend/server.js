const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true
}));
app.use(express.json());

// Banco de dados SQLite
const db = new sqlite3.Database('./backend/database.db');

// Criação da tabela
db.run(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    senha TEXT
  )
`);

const authRoutes = require('./routes/auth')(db);
const alunosRoutes = require('./routes/alunos')(db);

app.use(authRoutes);
app.use(alunosRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

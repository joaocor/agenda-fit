const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

// Configuração mais permissiva do CORS para desenvolvimento
app.use(cors({
  origin: true, // Permite qualquer origem
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// Servir arquivos estáticos
app.use(express.static('frontend'));
app.use('/agenda-fit', express.static('agenda-fit'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

// Log das requisições para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Banco de dados SQLite
const db = new sqlite3.Database('./database.db');

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

// Endpoint de teste
app.get('/test', (req, res) => {
  res.json({ mensagem: 'Servidor funcionando!', timestamp: new Date().toISOString() });
});

app.use(authRoutes);
app.use(alunosRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

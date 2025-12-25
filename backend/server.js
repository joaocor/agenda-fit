const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
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

app.post('/alunos', (req, res) => {
  const { nome, telefone, email } = req.body;

  // Regra 1 e 2
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios' });
  }

  // Regra 4
  if (telefone && telefone.length < 8) {
    return res.status(400).json({ erro: 'Telefone inválido' });
  }

  // Regra 3 - email único
  db.get(
    'SELECT id FROM alunos WHERE email = ?',
    [email],
    (err, row) => {
      if (row) {
        return res.status(409).json({ erro: 'E-mail já cadastrado' });
      }

      db.run(
        'INSERT INTO alunos (nome, telefone, email) VALUES (?, ?, ?)',
        [nome, telefone, email],
        () => res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso' })
      );
    }
  );
});


// Endpoint: listar alunos
app.get('/alunos', (req, res) => {
  db.all('SELECT * FROM alunos', [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

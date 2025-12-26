const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

module.exports = (db) => {

  // 🔹 Listar alunos (rota protegida)
  router.get('/alunos', authMiddleware, (req, res) => {
    db.all('SELECT * FROM alunos', (err, rows) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao buscar alunos' });
      }
      res.json(rows);
    });
  });

  // 🔹 Cadastrar aluno (rota protegida)
  router.post('/alunos', authMiddleware, (req, res) => {
    const { nome, telefone, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios' });
    }

    db.run(
      'INSERT INTO alunos (nome, telefone, email) VALUES (?, ?, ?)',
      [nome, telefone, email],
      function (err) {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao cadastrar aluno' });
        }
        res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso' });
      }
    );
  });

  return router;
};

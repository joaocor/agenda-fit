const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'agendaFitSecret';

module.exports = (db) => {

  // Registro
  router.post('/registro', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }

    db.run(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
      [email, senha],
      function (err) {
        if (err) {
          return res.status(409).json({ erro: 'E-mail já cadastrado' });
        }
        res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
      }
    );
  });

  // Login
  router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.get(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha],
      (err, usuario) => {
        if (!usuario) {
          return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
          { id: usuario.id, email: usuario.email },
          SECRET,
          { expiresIn: '24h' }
        );

        res.json({ token });
      }
    );
  });

  return router;
};

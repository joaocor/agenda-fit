const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'agendaFitSecret';

module.exports = (db) => {

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
          { expiresIn: '1h' }
        );

        res.json({ token });
      }
    );
  });

  return router;
};

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend/database.db');

// Criar usuário de teste
db.run(
  'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
  ['admin@teste.com', '123456'],
  function (err) {
    if (err) {
      console.log('Erro:', err.message);
    } else {
      console.log('Usuário criado com sucesso!');
      console.log('Email: admin@teste.com');
      console.log('Senha: 123456');
    }
    db.close();
  }
);
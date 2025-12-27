const API = 'http://localhost:3000/alunos';

function getToken() {
  return localStorage.getItem('token');
}

function cadastrarAluno() {
  const token = getToken();
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  if (!nome || !email) {
    alert('Nome e e-mail são obrigatórios');
    return;
  }

  fetch(API, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nome, telefone, email })
  })
  .then(res => res.json())
  .then(data => {
    if (data.mensagem) {
      document.getElementById('nome').value = '';
      document.getElementById('telefone').value = '';
      document.getElementById('email').value = '';
      listarAlunos();
    } else {
      alert(data.erro || 'Erro ao cadastrar');
    }
  });
}

function listarAlunos() {
  const token = getToken();
  fetch(API, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(alunos => {
    const lista = document.getElementById('lista-alunos');
    lista.innerHTML = '';
    alunos.forEach(a => {
      lista.innerHTML += `<li>${a.nome} - ${a.email}</li>`;
    });
  });
}

listarAlunos();

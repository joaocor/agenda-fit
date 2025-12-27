const token = localStorage.getItem('token');
if (!token) window.location.href = 'index.html';

function cadastrarAluno() {
  fetch('http://localhost:3000/alunos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      nome: nome.value,
      telefone: telefone.value,
      email: email.value
    })
  }).then(() => listarAlunos());
}

function listarAlunos() {
  fetch('http://localhost:3000/alunos', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => {
    lista-alunos.innerHTML = '';
    data.forEach(a => {
      lista-alunos.innerHTML += `<li>${a.nome} - ${a.email}</li>`;
    });
  });
}

listarAlunos();

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

const token = localStorage.getItem('token');
if (!token) window.location.href = 'index.html';

fetch('http://localhost:3000/alunos', {
  headers: { Authorization: 'Bearer ' + token }
})
.then(res => res.json())
.then(data => {
  document.getElementById('total-alunos').innerText = data.length;
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

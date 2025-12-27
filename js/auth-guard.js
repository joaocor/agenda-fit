function verificarAutenticacao() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'Index.html';
  }
  return token;
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'Index.html';
}

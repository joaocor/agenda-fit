const REGISTRO_API = 'http://localhost:3000/registro';

function fazerRegistro() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (!email || !senha || !confirmarSenha) {
    alert('Preencha todos os campos');
    return;
  }

  if (senha !== confirmarSenha) {
    alert('As senhas não conferem');
    return;
  }

  fetch(REGISTRO_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  })
  .then(res => res.json())
  .then(data => {
    if (data.mensagem) {
      alert('Conta criada com sucesso! Faça login');
      window.location.href = 'Index.html';
    } else {
      alert(data.erro || 'Erro ao registrar');
    }
  })
  .catch(() => alert('Erro ao conectar com servidor'));
}

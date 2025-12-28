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

  console.log('Tentando registrar usuário:', email);

  fetch(REGISTRO_API, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  })
  .then(response => {
    console.log('Status da resposta:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Resposta do servidor:', data);
    if (data.mensagem) {
      alert('Conta criada com sucesso! Faça login');
      window.location.href = '../frontend/Index.html';
    } else {
      alert(data.erro || 'Erro ao registrar');
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar com servidor. Verifique se o servidor está rodando em http://localhost:3000');
  });
}

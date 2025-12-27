function login() {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
      } else {
        document.getElementById('msg').innerText = 'Login inválido';
      }
    });
  }
  
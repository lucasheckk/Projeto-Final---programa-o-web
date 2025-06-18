document.getElementById('formLogin').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio do formulário

  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (usuario === '' || senha === '') {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  // Simula criação de conta (salva no localStorage)
  localStorage.setItem('usuario', usuario);

  // Redireciona para a página inicial
  window.location.href = '../@Casa/Home.html';
});

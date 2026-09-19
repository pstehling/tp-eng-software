const formPedir = document.getElementById('form-pedir-link');
const formNova = document.getElementById('form-nova-senha');
const mensagem = document.getElementById('mensagem');

// 1. O "Pulo do Gato": Checa se a URL tem o token (sinal de que o usuário veio do e-mail)
const hashUrl = window.location.hash;
const parametros = new URLSearchParams(hashUrl.substring(1));
const accessToken = parametros.get('access_token');

if (accessToken) {
    // Esconde o formulário de pedir e-mail e mostra o de nova senha
    formPedir.style.display = 'none';
    formNova.style.display = 'block';
}

// 2. Ação do Botão: Enviar o e-mail
formPedir.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const email = document.getElementById('email').value;

    const resposta = await fetch('/api/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    
    const dados = await resposta.json();
    exibirMensagem(dados.mensagem || dados.erro, dados.sucesso);
});

// 3. Ação do Botão: Salvar a nova senha
formNova.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const novaSenha = document.getElementById('nova-senha').value;

    const resposta = await fetch('/api/salvar-nova-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token_acesso: accessToken, nova_senha: novaSenha })
    });
    
    const dados = await resposta.json();
    exibirMensagem(dados.mensagem || dados.erro, dados.sucesso);
    
    if (dados.sucesso) {
        setTimeout(() => { window.location.href = '/login/index.html'; }, 3000);
    }
});

function exibirMensagem(texto, sucesso) {
    mensagem.innerText = texto;
    mensagem.style.color = sucesso ? 'green' : 'red';
    mensagem.style.display = 'block';
}
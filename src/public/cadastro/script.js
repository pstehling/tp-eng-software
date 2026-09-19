const form = document.getElementById('form-cadastro');
const mensagem = document.getElementById('mensagem'); // Certifique-se de ter essa div no HTML
const btnCadastrar = document.getElementById('btn-cadastrar');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    
    // Reseta estado
    btnCadastrar.disabled = true;
    mensagem.style.display = 'none';

    // Pega os dados do HTML
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirma-senha').value;

    // Validação local
    if (senha !== confirmaSenha) {
        mensagem.innerText = 'As senhas não coincidem!';
        mensagem.style.color = 'red';
        mensagem.style.display = 'block';
        btnCadastrar.disabled = false;
        return;
    }

    try {
        // Envia os dados para o SEU backend (server.js)
        const resposta = await fetch('/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();

        // Trata a resposta do backend
        if (!dados.sucesso) {
            mensagem.innerText = `Erro: ${dados.erro}`;
            mensagem.style.color = 'red';
        } else {
            mensagem.innerText = dados.mensagem;
            mensagem.style.color = 'green';
            form.reset();
        }
    } catch (erro) {
        mensagem.innerText = 'Erro ao conectar com o servidor.';
        mensagem.style.color = 'red';
    }

    mensagem.style.display = 'block';
    btnCadastrar.disabled = false;
});
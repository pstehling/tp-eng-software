const form = document.getElementById('form-login');
const msgErro = document.getElementById('mensagem-erro');
const btnEntrar = document.getElementById('btn-entrar');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    
    btnEntrar.disabled = true;
    msgErro.style.display = 'none';

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (!dados.sucesso) {
            // Exibe o erro genérico ou o aviso de e-mail não confirmado
            msgErro.innerText = dados.erro;
            msgErro.style.display = 'block';
            btnEntrar.disabled = false;
        } else {
            // Credenciais válidas redirecionam para a tela inicial
            window.location.href = dados.redirecionar;
        }
    } catch (erro) {
        msgErro.innerText = 'Erro ao conectar com o servidor.';
        msgErro.style.display = 'block';
        btnEntrar.disabled = false;
    }
});
document.querySelector('#demo').addEventListener('click', async () => {
  const resultado = document.querySelector('#resultado');
  try {
    const resp = await fetch('/api/status');
    const data = await resp.json();
    resultado.textContent = data.mensagem;
  } catch (err) {
    resultado.textContent = 'Não foi possível contatar o servidor. Verifique se ele está em execução.';
  }
});

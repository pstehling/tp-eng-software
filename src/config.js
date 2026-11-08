// Configuração da aplicação, lida das variáveis de ambiente (arquivo src/.env).
// Decisão arquitetural DA-04 (docs/arquitetura/arquitetura.md): nenhum endereço ou
// chave fica no código; o mesmo código roda localmente, nos testes e quando publicado.
const path = require('path');

// Caminho explícito: o .env é encontrado mesmo quando o servidor é iniciado fora de src/.
require('dotenv').config({ path: path.join(__dirname, '.env') });

const porta = Number(process.env.PORT) || 3000;

module.exports = {
  porta,
  // Endereço público da aplicação, usado nos links enviados por e-mail (RF-03)
  urlAplicacao: process.env.APP_URL || `http://localhost:${porta}`,
  supabase: {
    url: process.env.SUPABASE_URL,
    chaveAnonima: process.env.SUPABASE_ANON_KEY,
  },
};

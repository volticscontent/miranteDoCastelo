const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de todas as requisições
app.use((req, res, next) => {
  console.log('\n=== NOVA REQUISIÇÃO ===');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('========================\n');
  next();
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('🎯 WEBHOOK RECEBIDO!');
  console.log('📅 Data/Hora:', new Date().toLocaleString('pt-BR'));
  console.log('📦 Dados recebidos:');
  console.log(JSON.stringify(req.body, null, 2));
  
  // Verificar se é dados do formulário
  if (req.body['Nome_Completo']) {
    console.log('✅ FORMULÁRIO DETECTADO!');
    console.log('👤 Nome:', req.body['Nome_Completo']);
    console.log('📞 Telefone:', req.body['Telefone']);
    console.log('📧 Email:', req.body['E-mail']);
    console.log('💰 Renda:', req.body['Renda familiar']);
    console.log('💳 Parcela:', req.body['Valor de parcela que procura']);
  } else if (req.body.event_name) {
    console.log('📊 FACEBOOK PIXEL DETECTADO!');
    console.log('🎯 Evento:', req.body.event_name);
  } else {
    console.log('❓ DADOS DESCONHECIDOS');
  }
  
  console.log('─'.repeat(50));
  
  // Responder com sucesso
  res.status(200).json({
    success: true,
    message: 'Webhook recebido com sucesso!',
    timestamp: new Date().toISOString(),
    data: req.body
  });
});

// Endpoint para testar se está funcionando
app.get('/', (req, res) => {
  res.json({
    message: 'Webhook de teste funcionando!',
    endpoints: {
      webhook: 'POST /webhook',
      status: 'GET /'
    },
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Webhook de teste rodando!');
  console.log(`📡 URL: http://localhost:${PORT}/webhook`);
  console.log(`🌐 Status: http://localhost:${PORT}/`);
  console.log('─'.repeat(50));
});

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada:', reason);
}); 
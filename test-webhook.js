// Script para testar o webhook
const testWebhook = async () => {
  const webhookUrl = 'http://localhost:3001/webhook';
  
  // Dados de teste do formulário
  const formData = {
    "Nome_Completo": "João Silva Teste",
    "Telefone": "31-99999-9999",
    "E-mail": "joao.teste@email.com",
    "Renda familiar": "5-10",
    "Valor de parcela que procura": "2k-2500"
  };
  
  console.log('🧪 Testando webhook...');
  console.log('📡 URL:', webhookUrl);
  console.log('📦 Dados:', JSON.stringify(formData, null, 2));
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    console.log('✅ Resposta do webhook:');
    console.log('📊 Status:', response.status);
    console.log('📋 Resultado:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Erro ao testar webhook:', error.message);
  }
};

// Executar teste
testWebhook(); 
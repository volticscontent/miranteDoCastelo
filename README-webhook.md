# 🎯 Webhook de Teste

Webhook simples para testar o formulário do site.

## 🚀 Como usar:

### 1. Instalar dependências:
```bash
npm install express cors
```

### 2. Rodar o webhook:
```bash
node webhook-test.js
```

### 3. Testar o webhook:
```bash
node test-webhook.js
```

## 📡 Endpoints:

- **Webhook**: `POST http://localhost:3001/webhook`
- **Status**: `GET http://localhost:3001/`

## 🧪 Para testar com o formulário:

1. Altere temporariamente o webhook no `contact.js`:
```javascript
WEBHOOK_URL: 'http://localhost:3001/webhook',
```

2. Rode o webhook de teste
3. Preencha o formulário no site
4. Veja os dados chegando no console

## 📦 O que o webhook mostra:

- ✅ **Dados do formulário** (Nome, Telefone, Email, etc.)
- 📊 **Eventos do Facebook Pixel** (se houver)
- 🕐 **Timestamp** de cada requisição
- 📋 **JSON completo** dos dados recebidos

## 🔄 Para voltar ao Make.com:

Altere de volta no `contact.js`:
```javascript
WEBHOOK_URL: 'https://hook.eu2.make.com/mjxthixyva104axff8vxw772ravcnqyv',
``` 
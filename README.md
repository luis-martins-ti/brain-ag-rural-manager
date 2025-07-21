# 🌾 Rural Manager API

API RESTful para o gerenciamento de produtores rurais, suas propriedades, safras e culturas. Desenvolvido com **NestJS**, **TypeScript**, **PostgreSQL**, **Prisma ORM** e **Swagger**.

---

## 🚀 Como iniciar o projeto

### ✅ Pré-requisitos
- Docker + Docker Compose
- Node.js 18+
- NPM

---

### 🧱 STEP 1 - Build e start com Docker

**Renomeie o arquivo .env.example para .env e execute:**

```bash
docker compose build --no-cache
docker compose up -d
```
Apague qualquer arquivo com extensão .tsbuildinfo na raiz do projeto antes de rodar o build ou a pasta dist não será gerada.

### 📦 STEP 2 - Criar banco e aplicar migrações Prisma

As Migrações rodam automaticamente ao iniciar o container. Aguarde alguns minutos para intalação de dependências e inicialização do sistema.

### 🖥️ STEP 3 - Iniciar a aplicação
A aplicação se inicia automaticamente com o Docker após alguns segundos. Para acessar a API use: http://localhost:3000/api

### 📚 DOCUMENTAÇÃO:
Após rodar a aplicação, o arquivo swagger.json será gerado automaticamente na raiz do projeto. Acesse a documentação interativa no navegador:
```bash
http://localhost:3000/api/docs
```

**Como usar swagger.json no Postman / Insomnia**
Swagger UI:

Acesse: https://editor.swagger.io/
Clique em "File" → "Import File" → selecione swagger.json

Postman:

Vá em Import > File > Upload Files > swagger.json
Os endpoints serão importados automaticamente.

Insomnia:

Vá em Create > Import From File > swagger.json
Ele criará uma collection pronta para testar a API.

### 🧪 TESTES:

```bash
npm run test:e2e
```
**Estrutura usada para testes:**
Testes estão localizados em arquivos *.int-spec.ts
Usa supertest para simular requisições HTTP reais
PrismaService é mockado para isolamento dos testes de regra de negócio

### 🛠️ TROBLESHOOTING:
| Erro                                         | Causa provável                   | Solução                                                        |
|----------------------------------------------|----------------------------------|----------------------------------------------------------------|
| `Cannot find module '@prisma/client'`        | Dependência ausente              | Rode `npm install` e `npx prisma generate`                     |
| `DATABASE_URL not found`                     | Variável `.env` ausente          | Verifique se o arquivo `.env` está correto                     |
| `Error: P1001 - Can't reach database server` | Banco ainda não subiu            | Aguarde o `docker compose up` concluir                         |
| `Validation failed (numeric string...)`      | UUID ou número inválido          | Verifique os dados enviados na requisição                      |
| Swagger não mostra endpoints atualizados     | Cache ou app não reiniciado      | Reinicie com `Ctrl+C` e `npm run start:dev`                    |


### 📘 Tecnologias Utilizadas
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Swagger (OpenAPI)
- Jest + Supertest (testes integrados)
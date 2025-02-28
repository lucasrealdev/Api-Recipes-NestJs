# API de Receitas ⛅

Esta é uma API RESTful de gerenciamento de receitas, desenvolvida com [NestJS](https://nestjs.com/) e [MongoDB](https://www.mongodb.com/). A API permite criar, ler, atualizar e excluir receitas, com funcionalidades avançadas como filtros e ordenações.

## Funcionalidades ⚙️

- **Listar todas as receitas**
  - Suporte a paginação.
  - Ordenação por tempo de preparo, alfabética.
- **Obter uma receita pelo ID**
- **Criar uma nova receita**
- **Atualizar uma receita existente**
- **Excluir uma receita**
- **Pesquisar receitas**
  - Pesquisa por nome e ingredientes.

## Tecnologias Utilizadas 👨‍💻

- **Framework:** NestJS
- **Banco de Dados:** MongoDB
- **Linguagem:** TypeScript
- **Jest:** Testes Unitários
- **Validação:** class-validator
- **Documentação:** Swagger

## Como Executar o Projeto Localmente 🌐

### Requisitos

- Node.js (v16 ou superior)
- MongoDB (local ou em um serviço como Atlas)
- npm ou yarn

### Passos

1. **Clone o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd api-de-receitas
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o banco de dados** Crie um arquivo `.env` na raiz do projeto com a seguinte configuração:

   ```env
   MONGODB_URI=mongodb://localhost/recipesApi
   ```

4. **Inicie a aplicação**

   ```bash
   npm run start:dev
   # ou
   yarn start:dev
   ```

5. **Acesse a aplicação**

   - A API estará rodando em: `http://localhost:3000`
   - A documentação do Swagger estará disponível em: `http://localhost:3000/api`

## Endpoints 🔧

### **1. Listar todas as receitas**

**GET** `/recipes`

#### Resposta:

```json
[
  {
    "_id": "123abc456def",
    "name": "Omelete Simples",
    "publisher": {
      "name": "Receitas Rápidas",
      "email": "contato@receitasrapidas.com",
      "_id": "789ghi101jkl"
    },
    "category": "Café da Manhã",
    "language": "Português",
    "prepTime": 5,
    "ingredients": [
      { "name": "Ovos", "quantity": 2, "unit": "unidades" },
      { "name": "Sal", "quantity": 1, "unit": "pitada" },
      { "name": "Manteiga", "quantity": 1, "unit": "colher de chá" }
    ],
    "instructions": [
      "Bata os ovos com o sal.",
      "Aqueça a manteiga em uma frigideira.",
      "Despeje os ovos batidos e cozinhe até firmar."
    ],
    "imageUrl": "https://example.com/images/omelete.jpg",
    "notes": "Pode adicionar queijo ou ervas a gosto."
  }
]
```

### **2. Obter uma receita pelo ID**

**GET** `/recipes/id/:id`

#### Resposta:

```json
{
  "_id": "123abc456def",
  "name": "Omelete Simples",
  "publisher": {
    "name": "Receitas Rápidas",
    "email": "contato@receitasrapidas.com",
    "_id": "789ghi101jkl"
  },
  "category": "Café da Manhã",
  "language": "Português",
  "prepTime": 5,
  "ingredients": [
    { "name": "Ovos", "quantity": 2, "unit": "unidades" },
    { "name": "Sal", "quantity": 1, "unit": "pitada" },
    { "name": "Manteiga", "quantity": 1, "unit": "colher de chá" }
  ],
  "instructions": [
    "Bata os ovos com o sal.",
    "Aqueça a manteiga em uma frigideira.",
    "Despeje os ovos batidos e cozinhe até firmar."
  ],
  "imageUrl": "https://example.com/images/omelete.jpg",
  "notes": "Pode adicionar queijo ou ervas a gosto."
}
```

### **3. Criar uma nova receita**

**POST** `/recipes`

#### Corpo da Requisição:

```json
{
  "name": "Omelete Simples",
  "publisher": {
    "name": "Receitas Rápidas",
    "email": "contato@receitasrapidas.com"
  },
  "category": "Café da Manhã",
  "language": "Português",
  "prepTime": 5,
  "ingredients": [
    { "name": "Ovos", "quantity": 2, "unit": "unidades" },
    { "name": "Sal", "quantity": 1, "unit": "pitada" },
    { "name": "Manteiga", "quantity": 1, "unit": "colher de chá" }
  ],
  "instructions": [
    "Bata os ovos com o sal.",
    "Aqueça a manteiga em uma frigideira.",
    "Despeje os ovos batidos e cozinhe até firmar."
  ],
  "imageUrl": "https://example.com/images/omelete.jpg",
  "notes": "Pode adicionar queijo ou ervas a gosto."
}
```

#### Resposta:

```json
{
  "_id": "123abc456def",
  "name": "Omelete Simples",
  "publisher": {
    "name": "Receitas Rápidas",
    "email": "contato@receitasrapidas.com",
    "_id": "789ghi101jkl"
  },
  "category": "Café da Manhã",
  "language": "Português",
  "prepTime": 5,
  "ingredients": [
    { "name": "Ovos", "quantity": 2, "unit": "unidades" },
    { "name": "Sal", "quantity": 1, "unit": "pitada" },
    { "name": "Manteiga", "quantity": 1, "unit": "colher de chá" }
  ],
  "instructions": [
    "Bata os ovos com o sal.",
    "Aqueça a manteiga em uma frigideira.",
    "Despeje os ovos batidos e cozinhe até firmar."
  ],
  "imageUrl": "https://example.com/images/omelete.jpg",
  "notes": "Pode adicionar queijo ou ervas a gosto."
}
```

## Contribuições 🌟

Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou relatar problemas na aba de Issues.
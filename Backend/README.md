# BookVoyage App

## Descrição do Projeto

BookVoyage é uma aplicação de gerenciamento de biblioteca digital que permite aos usuários buscar, emprestar e devolver livros. O sistema possui diferentes níveis de acesso, onde administradores podem gerenciar o catálogo de livros, enquanto usuários comuns podem emprestar livros disponíveis.

A aplicação é construída com uma arquitetura moderna utilizando Node.js, TypeScript, Fastify e Prisma ORM para interação com o banco de dados PostgreSQL.

## Tutorial de Implementação

### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL
- Docker e Docker Compose (opcional, para ambiente containerizado)

### Configuração Inicial

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd BookVoyage/Backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` baseado no exemplo abaixo:
   ```
   # Database
   DATABASE_URL="postgresql://postgres:docker@localhost:5432/bookvoyage?schema=public"

   # Auth
   JWT_SECRET="sua-chave-secreta-para-jwt"
   ```

4. **Configure o banco de dados**
   - Utilizando Docker:
   ```bash
   docker-compose up -d
   ```
   - Ou configure manualmente o PostgreSQL

5. **Execute as migrações do Prisma**
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

### Estrutura do Projeto

- `/prisma`: Configuração do ORM e migrações
- `/src`: Código fonte da aplicação
  - `/@types`: Definições de tipos TypeScript
  - `/env`: Configuração de variáveis de ambiente
  - `/http`: Controladores, middlewares e rotas da API
  - `/lib`: Utilitários e configurações
  - `/repositories`: Camada de acesso aos dados
  - `/use-cases`: Regras de negócio da aplicação

### Executando Testes

```bash
npm run test
```

### Endpoints da API

**Autenticação**
- `POST /users`: Criar um novo usuário
- `POST /sessions`: Autenticar usuário

**Livros**
- `GET /books`: Listar todos os livros (com paginação)
- `GET /books/:id`: Buscar um livro específico
- `POST /books`: Adicionar um novo livro (requer autenticação de admin)
- `PUT /books/:id`: Atualizar um livro (requer autenticação de admin)
- `DELETE /books/:id`: Remover um livro (requer autenticação de admin)
- `GET /books/search`: Buscar livros por título ou autor

**Empréstimos**
- `POST /loans`: Criar um novo empréstimo
- `GET /loans/user`: Visualizar empréstimos do usuário atual
- `PATCH /loans/:id/return`: Devolver um livro emprestado

## Requisitos Funcionais (RF)
- [x] Os usuários poderão se cadastrar no sistema.
- [x] Os usuários poderão se autenticar no sistema.
- [x] Os Administradores poderão adicionar, editar e remover livros do sistema.
- [x] Os usuários poderão buscar os livros por título ou autor.
- [x] Os usuários poderão emprestar os livros disponíveis
- [x] Os usuários poderão visualizar os detalhes de seu empréstimo
- [x] Os usuários poderão devolver os livros emprestados.
- [x] O sistema deve atualizar o status do empréstimo e a quantidade disponível do livro após o empréstimo.

## Regras de Negócio (RN)
- [x] Cada usuário pode ter no máximo 2 livros emprestados ao mesmo tempo.
- [x] O prazo padrão para devolução de um livro é de 14 dias.
- [x] Um livro pode ser emprestado se houver cópias disponíveis

## Requisitos Não Funcionais (RNF)
- [x] A senha do usuário precisa ser criptografada
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 10 itens por página

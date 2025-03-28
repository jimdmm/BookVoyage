|#App

BookVoyage App

## RF
- [ ] Os usuários poderão se cadastrar no sistema.
- [ ] Os usuários poderão se autenticar no sistema.
- [ ] Os Administradores poderão adicionar, editar e remover livros do sistema.
- [ ] Os usuários poderão buscar os livros por título, autor, ISBN ou categoria.
- [ ] Os usuários poderão emprestar os livros disponíveis
- [ ] Os usuários poderão devolver os livros emprestados.
- [ ] O sistema deve atualizar a quantidade disponível do livro após o empréstimo.
- [ ] O sistema deve atualizar o status do empréstimo e a quantidade disponível do livro.

## RN
- [ ] Cada usuário pode ter no máximo 2 livros emprestados ao mesmo tempo.
- [ ] O prazo padrão para devolução de um livro é de 14 dias.
- [ ] Um livro pode ser emprestado se houver cópias disponíveis
- [ ] Apenas administradores podem adicionar, editar e remover livros

## RNF
- [ ] A senha do usuário precisa ser criptografada
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
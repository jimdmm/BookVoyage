|#App

BookVoyage App

## RF
- [x] Os usuários poderão se cadastrar no sistema.
- [ ] Os usuários poderão se autenticar no sistema.
- [x] Os Administradores poderão adicionar, editar e remover livros do sistema.
- [x] Os usuários poderão buscar os livros por título ou autor.
- [ ] Os usuários poderão emprestar os livros disponíveis
- [ ] Os usuários poderão visualizar os detalhes de seu empréstimo
- [ ] Os usuários poderão devolver os livros emprestados.
- [ ] O sistema deve atualizar a quantidade disponível do livro após o empréstimo.
- [ ] O sistema deve atualizar o status do empréstimo e a quantidade disponível do livro.
- [ ] Os Administradores poderão gerar um relatório de emprétimos

## RN
- [ ] Cada usuário pode ter no máximo 2 livros emprestados ao mesmo tempo.
- [x] O prazo padrão para devolução de um livro é de 14 dias.
- [ ] Um livro pode ser emprestado se houver cópias disponíveis

## RNF
- [ ] A senha do usuário precisa ser criptografada
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [ ] Todas as listas de dados precisam estar paginadas com 10 itens por página
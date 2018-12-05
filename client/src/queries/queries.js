//um arquivo só para deixar o codigo mais organizado
//separando todas as query's da front-end em um arquivo separado
import {gql} from 'apollo-boost'

//query para pegar todos autores
const getAuthorsQuerry = gql`
  {
    authors{
      name
      id
    }
  }
`
//query para pegar todos livros
const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

//Query para adicionar algum livro na front end
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

//query para mostrar o BookDetails ou seja quando clicar aparecer os detalhes do livro
const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

export{getAuthorsQuerry, getBooksQuery, getBookQuery, addBookMutation}
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {getAuthorsQuerry, addBookMutation, getBooksQuery} from '../queries/queries'

export class AddBook extends Component {

//state feito para guardar o que digito nos campos antes de eu enviar para o graphql e back

  constructor(props){
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  //função para mostrar todos os autores se tudo estiver correto
  displayAuthors(){
    var data = this.props.getAuthorQuerry
    if(data.loading){
      return(<option disabled>Carregado Autores</option>)
    }else{
      return data.authors.map(author =>{
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    }
  }

  //função para quando o usuario enviar o form essa função ser executada
  //então enviando as variaveis name,genre,authorId para a props da mutation
  //e dando refetch que serve para assim que eu adiconar um livros a query ser reiniciada e mostrar o novo livro
  submitForm(e){
    e.preventDefault()
    this.props.addBookMutation({
      variables:{
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    })
  }

  render() {
    return (
    <form id = "add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Nome do livro:</label>
          <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
        </div>

        <div className="field">
          <label>Genero:</label>
          <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Autor:</label>
          <select onChange={(e) => this.setState({authorId: e.target.value})}>
            <option>Selecione o Autor</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    )
  }
}
//sintaxe padrão do compose para indar query's 
export default compose(
  graphql(getAuthorsQuerry, { name: "getAuthorQuerry"}),
  graphql(addBookMutation,  {name: "addBookMutation"})
                      )(AddBook)

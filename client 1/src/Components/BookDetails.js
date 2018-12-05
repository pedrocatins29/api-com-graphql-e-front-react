import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {getBookQuery} from '../queries/queries'

export class BookDetails extends Component {
  //função para mostrar mais informações quando você clica em um livro
  displayBookDetails(){
    const { book } = this.props.data
    if (book){
      return(
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>Todos os livros deste autor:</p>
          <ul className="other-books">
            { book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    }else{
      return(
        <div>Nenhum Livro selecionado...</div>
      )}
  }
  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    )
  }}
export default graphql(getBookQuery, {
  options: (props) =>{
    return{
      variables:{
        id: props.bookid
      }
    }
  }
})(BookDetails)
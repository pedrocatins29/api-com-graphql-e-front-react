import React, { Component } from 'react';
import BookList from './Components/BookList'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AddBook from './Components/AddBook'

//criando um ApolloClient para o react interagir com o graphql na porta 4000

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      //tenho que envolver todo meu return ne uma tag ApolloProvider e prover o client
      <ApolloProvider client={client}>
        <div id="main">
          <h1>
            Lista de livros TOPS
            <BookList/>
            <AddBook/>
          </h1>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

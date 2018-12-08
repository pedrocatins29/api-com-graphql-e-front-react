import React, { Component } from 'react'

export class Booksapi extends Component {
  constructor(props){
    super(props)
    this.state = {
      titles: "",
      author: "",
      procurar: "harry",
      description: "",
      id: "",
      json_livro: "",
      thumbnail: "",
      url_loja: ""
    }
  }

  //criar função e router para outra pagina para ficar mais simples usandos eu proprio state
  componentWillMount(){
    fetch("https://www.googleapis.com/books/v1/volumes?q="+ this.state.procurar)
      .then(res => res.json())
      .then(data => {for(let i =0;i<data.items.length;i++){
        this.setState({titles: data.items[i].volumeInfo.title,
                      author: data.items[i].volumeInfo.authors,
                      id: data.items[i].id,
                      json_livro: data.items[i].selfLink,
                      description: data.items[i].volumeInfo.description,
                      thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail,
                      url_loja: data.items[i].volumeInfo.canonicalVolumeLink})
      }})
  }

  render() {
    const a = []
    return (
        <div className="todoss">
          {a.push(this.state.titles)}
          {a.map(titulo => (
            <li key={this.state.id}>{titulo}</li>
          ))}
        </div>
    )
  }
}

export default Booksapi
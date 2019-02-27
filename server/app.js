//arquivo que faz o server funcionar por meio do express, node e graphql

const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(cors())

mongoose.connect('mongodb://pedrocatins29:melebaby123@ds231228.mlab.com:31228/graph-learning')
mongoose.connection.once('open', () =>{
    console.log('conectado com o banco de dados')
})


//dizendo para o express usar o /graphql como um graphqlHTTP
//fazendo o express entender e trabalhar junto com o graphql
app.use('/graphql', graphqlHTTP({
//definindo o schema que eu importei em cima e criando uma ferramenta grafica para testes
    schema,
    graphiql:true
}))


//dizendo para o express iniciar na porta 4000
app.listen(4000, () =>{
    console.log('Recebendo requests na porta 4000 teste')
});


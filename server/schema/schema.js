//este arquivo é para criar um schema
//ou seja definir uma query e os objetos que podemos buscar

const graphql = require('graphql');
//importando lodash que é para dar um find no vetor
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull } = graphql;
//destruturação, tirando tudo dentro do graphql

//criando o objeto dos autores

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:   {type: GraphQLID},
        name: {type: GraphQLString},
        age:  {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({
                    authorId: parent.id
                })
            }
        }
    })
});

//criando o objeto dos livros

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:    {type: GraphQLID},
        name:  {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId)
            }
        }
    })
});

//criando uma query para buscar os dados pedidos baseado no id

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({})
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({})
            }
        }
    }
})


//criando uma mutation, que é para adicionar livros ou autores, por meio das funções
//addBook e addAuthor
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                genre: {type:new GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return book.save()
        }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

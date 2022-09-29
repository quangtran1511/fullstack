const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]
/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    bookCount: Int!
    allBooks(author: String, genres: String): [Book!]!
  }
  type Mutation {
    addBooks(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      born: Int!
      ) : Author
    }
  `
  const resolvers = {
    Query: {
      authorCount: () => authors.length,
      bookCount: () => books.length,
      allBooks: (root, args) => {
        if(args.author) {
          const foundAuthor = books.filter(book => book.author === args.author)
          console.log(foundAuthor)
          return foundAuthor
        } else if (args.genres) {
          const foundGenres = books.filter(book => book.genres.includes(args.genres))
          console.log(foundGenres)
          return foundGenres
        } else if (args.author && args.genres) {
          const foundAuthor = books.filter(book => book.author === args.author)
          const foundGenres = foundAuthor.filter(book => book.genres.includes(args.genres))
          console.log(foundGenres, foundAuthor)
          return foundGenres
        } else {
          return books
        }
      },
      allAuthors: () => {
        const author = books.map((book) => book.author)
        const countBooksByAuthor = author.reduce((acc, curr) => {
          acc[curr]
          ? acc[curr]++
          : acc[curr] = 1
          return acc
        }, {})
        const result = Object.keys(countBooksByAuthor).map((key) => {
          return {
            name: key,
            born: authors.find(author => author.name === key).born,
            bookCount: countBooksByAuthor[key]
          }
        })
        return result
      }
    },
    Book: {
      author: (root) => {
        const foundAuthor = authors.find(author => author.name === root.author)
        return {
          name: root.author,
          born: foundAuthor.born
        }
      }
    },
    Mutation: {
      addBooks: (root, args) => {
        const findAuthor = authors.find(author => author.name === args.author)
        if(findAuthor) {
          const newBook = { ...args, id: uuid() }
          books = books.concat(newBook)
          return newBook
        } else {
          const newAuthor = {
            name: args.author,
            born: null,
            bookCount: 1,
            id: uuid()
          }
          authors = authors.concat(newAuthor)
          const newBook = { ...args, id: uuid() }
          books = books.concat(newBook)
          return newBook
        }
      },
      editAuthor: (root, args) => {
        const foundAuthor = authors.find(author => author.name === args.name)
        if(foundAuthor) {
          foundAuthor.born = args.born
          return foundAuthor
        }
          return null
      }
    }
  }
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
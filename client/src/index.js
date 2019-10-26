import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import './styles/bundle.css'
import App from './App'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink('https://eu1.prisma.sh/albi-abdyli/react-gql/dev'),
  typeDefs: './generated/prisma.graphql'
});

console.log(client)

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));
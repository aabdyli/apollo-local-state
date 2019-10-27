import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import './styles/bundle.css'
import App from './App'
import localState from './state'

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/albi-abdyli/react-gql/dev',
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
    });
  },
  typeDefs: 'src/schema.graphql',
  clientState: localState
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));
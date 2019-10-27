import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import './styles/bundle.css'
import App from './App'

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
  clientState: {
    resolvers:{
      Mutation: {
        updateNote(_, {note}, { cache }) {
          const data = {
            data: {
              activeNote: note,
              editable: false
            }
          }
          cache.writeData(data)
          
          return data;
        },
        clearActive(_, variables, {cache}) {
          const data = {
            data: {
              activeNote: {
                id: "",
                title:"",
                content: "",
                __typename: "Note"
              }
            }
          }
          cache.writeData(data)
          return data;
        },
        setEditable(_, {state}, {cache}) {
          const data = {
            data:{
              editable: state
            }
          }

          cache.writeData(data)

          return data;
        }
      }
    },
    defaults:{
      editable: true,
      activeNote: {
        id: null,
        title:"",
        content: "",
        createdAt: "",
        __typename: "Note"
      }
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));
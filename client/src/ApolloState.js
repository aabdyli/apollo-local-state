import {ApolloClient, InMemoryCache, gql} from 'apollo-boost'

const note1 =  `
# Live demo

Changes are automatically rendered as you type.

## Table of Contents`
const note2 = `
# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)`

const typeDefs = gql`
  type Note {
    id: Int!
    title: String!
    content: String!
  }

  type Query {
    getNotes: [Notes]!
  }
`

const notes = [
  {
    id: 1,
    title: "Note 1",
    // eslint-disable-next-line no-use-before-define
    content: note1
  },
  {
  id: 2,
  title: "Note 2",
  // eslint-disable-next-line no-use-before-define
  content: note2
  }
]

const resolvers = {
  Query: {
    getNotes: () => notes
  }
}

const client = new ApolloClient({
  cache: new InMemoryCache({
    freezeResults: true
  }),
  connectToDevTools: true,
  resolvers,
  typeDefs,
  assumeImmutableResults: true
})

export default client


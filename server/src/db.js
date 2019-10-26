const {Prisma, forwardTo} = require('prisma-binding')

const resolvers = {
  Query: {
    notes: forwardTo('db'),
    note: forwardTo('db')
  }
}

const db = new Prisma({
  typeDefs: './generated/prisma.graphql',
  endpoint: 'https://eu1.prisma.sh/albi-abdyli/react-gql/dev',
  secret: process.env.PRISMA_SECRET,
  debug: false,
});

module.exports = db
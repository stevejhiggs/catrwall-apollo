import { ApolloServer, gql } from 'apollo-server';
import * as catStore from './cats/store.js';

catStore.refreshCats();

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type Cat {
    id: String!
    imageUrl: String!
    votes: Int!
  }

  type Query {
    cats: [Cat]
  }

  type Mutation {
    # A mutation to add a new channel to the list of channels
    voteForCat(id: String!): Cat
  }
`;

const resolvers = {
  Query: {
    cats: async () => catStore.cats,
  },
  Mutation: {
    voteForCat: (_, args) => {
      return catStore.voteForCat(args.id);
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

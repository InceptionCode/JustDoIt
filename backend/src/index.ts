import { ApolloServer, gql } from "apollo-server-cloud-functions";

const serviceAccount = require('../justdoit-service-account.json');

import { Firestore } from '@google-cloud/firestore'

// Create a new client

const initialize: FirebaseFirestore.Settings = {
  projectId: 'justdoit-301322',
  keyFilename: serviceAccount,
}

const firestore = new Firestore(initialize);


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({ req, res }) => ({
    headers: req.headers,
    req,
    res,
  }),
});

exports.api = server.createHandler();

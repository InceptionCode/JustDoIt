"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_cloud_functions_1 = require("apollo-server-cloud-functions");
const serviceAccount = require('../justdoit-service-account.json');
const firestore_1 = require("@google-cloud/firestore");
// Create a new client
const initialize = {
    projectId: 'justdoit-301322',
    keyFilename: serviceAccount,
};
const firestore = new firestore_1.Firestore(initialize);
// Construct a schema, using GraphQL schema language
const typeDefs = apollo_server_cloud_functions_1.gql `
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
const server = new apollo_server_cloud_functions_1.ApolloServer({
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
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_cloud_functions_1 = require("apollo-server-cloud-functions");
const TodoRepository_1 = tslib_1.__importDefault(require("./repository/TodoRepository"));
const env = process.env.ENVIRONMENT;
console.info(`In ${env} environment`);
// Construct a schema, using GraphQL schema language
// Defines the shape of data available & a query (Defines the entry points into the api)
/*
Ex: type Query {
      hello: String
    }
*/
console.info('Writing types');
const typeDefs = apollo_server_cloud_functions_1.gql `
  # Todos

  type Todo {
    id: String!
    completed: Boolean!
    createdBy: CreatedBy!
    tags: [Tag]!
    text: String!
  }

  # User
  type User {
    id: String!
    userId: String!
    username: String!
    email: String!
  }

  type CreatedBy {
    id: String!
    username: String!
  }

  # Tags

  type Tag {
    label: String!
    id: String!
    todoRefs: [String]! # todo ID
  }

  # Query (endpoints)

  type Query {
    user(userId: String!): User
    todos(completed: Boolean = false): [Todo]
    todo(id: String!): Todo
    tags: [Tag]
  }
`;
// Provide resolver functions for your schema fields
// Tells how to actually return the data or how to fetch the types above. 
// Query tells how to fetch the root documents. While anything else explains how to get data that come from a different source (collection).
// Database access here...
console.info('Writing resolver');
const resolvers = {
    Todo: {
        tags: async (todo) => {
            try {
                return await TodoRepository_1.default.getTagsByTodo(todo.id);
            }
            catch (error) {
                throw new apollo_server_cloud_functions_1.ApolloError(error);
            }
        },
    },
    Query: {
        user: async (_, args) => {
            try {
                return await TodoRepository_1.default.getUser(args.userId) || new apollo_server_cloud_functions_1.ValidationError('User ID not found');
            }
            catch (error) {
                throw new apollo_server_cloud_functions_1.ApolloError(error);
            }
        },
        todos: async (_, args) => {
            try {
                return await TodoRepository_1.default.getTodos(args.completed);
            }
            catch (error) {
                throw new apollo_server_cloud_functions_1.ApolloError(error);
            }
        },
        todo: async (_, args) => {
            try {
                return await TodoRepository_1.default.getTodo(args.id);
            }
            catch (error) {
                throw new apollo_server_cloud_functions_1.ApolloError(error);
            }
        },
        tags: async () => {
            try {
                return await TodoRepository_1.default.getTags();
            }
            catch (error) {
                throw new apollo_server_cloud_functions_1.ApolloError(error);
            }
        }
    }
};
console.info('Defining server');
const server = new apollo_server_cloud_functions_1.ApolloServer({
    typeDefs,
    resolvers,
    playground: env === "dev",
    introspection: env === "dev",
    context: ({ req, res }) => ({
        headers: req.headers,
        req,
        res,
    }),
});
exports.api = server.createHandler({
    cors: { origin: '*', credentials: true }
});
//# sourceMappingURL=index.js.map
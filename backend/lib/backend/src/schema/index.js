"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tools_1 = require("graphql-tools");
const TodoRepository_1 = tslib_1.__importDefault(require("../repository/TodoRepository"));
const errorConstants = tslib_1.__importStar(require("../../../common/constants/errorConstants"));
const validationError_1 = tslib_1.__importDefault(require("../errors/validationError"));
const error_1 = tslib_1.__importDefault(require("../errors/error"));
// Construct a schema, using GraphQL schema language
// Defines the shape of data available & a query (Defines the entry points into the api)
/*
Ex: type Query {
      hello: String
    }
*/
console.info('Writing types');
const typeDefs = `
# Query (endpoints)

type Query {
  user(userId: String!): User
  todos(completed: Boolean = false): [Todo]
  todo(id: String!): Todo
  tags: [Tag]
}

type Mutation {
  updateUser(user: UserInput!): User
}

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

input UserInput {
  userId: String!
  username: String!
  email: String!
}`;
// Database access here...
console.info('Writing resolver');
const resolvers = {
    Todo: {
        tags: async (todo) => {
            try {
                return await TodoRepository_1.default.getTagsByTodo(todo.id);
            }
            catch (error) {
                throw new error_1.default(error);
            }
        },
    },
    Query: {
        user: async (_, { userId }) => {
            try {
                return await TodoRepository_1.default.getUser(userId);
            }
            catch (error) {
                throw _errorHandler(error);
            }
        },
        todos: async (_, { completed }) => {
            try {
                return await TodoRepository_1.default.getTodos(completed);
            }
            catch (error) {
                throw new error_1.default(error);
            }
        },
        todo: async (_, { id }) => {
            try {
                return await TodoRepository_1.default.getTodo(id);
            }
            catch (error) {
                throw new error_1.default(error);
            }
        },
        tags: async () => {
            try {
                return await TodoRepository_1.default.getTags();
            }
            catch (error) {
                throw new error_1.default(error);
            }
        }
    },
    Mutation: {
        updateUser: async (_, { user }) => {
            try {
                return await TodoRepository_1.default.updateUser(user);
            }
            catch (error) {
                throw _errorHandler(error);
            }
        }
    }
};
const _errorHandler = (error) => {
    switch (error.message) {
        case errorConstants.invalidUser:
        case errorConstants.authInvalidUser:
            return new validationError_1.default(errorConstants.invalidUserMessage);
        default:
            return new error_1.default(error);
    }
};
const schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
exports.default = schema;
//# sourceMappingURL=index.js.map
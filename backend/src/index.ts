import { ApolloServer, gql, ApolloError, ValidationError } from "apollo-server-cloud-functions";

import TagsDto from "../../common/Dtos/TagsDto";
import TodosDto from '../../common/Dtos/TodosDto'
import UserDto from '../../common/Dtos/UserDto'
import { ITodo } from "../../common/Interfaces/ITodo";
import TodoRepository from './repository/TodoRepository'

import environment from './types/EnvTypes'
const env: environment = process.env.ENVIRONMENT as environment

console.info(`In ${env} environment`)
// Construct a schema, using GraphQL schema language
// Defines the shape of data available & a query (Defines the entry points into the api)
/* 
Ex: type Query {
      hello: String
    }
*/

console.info('Writing types')

const typeDefs = gql`
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
console.info('Writing resolver')

const resolvers = {
  Todo: {
    tags: async (todo: ITodo): Promise<TagsDto[]> => {
      try {
        return await TodoRepository.getTagsByTodo(todo.id)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
  },
  Query: {
    user: async (_: any, args: any): Promise<UserDto | ValidationError> => {
      try {
        return await TodoRepository.getUser(args.userId) || new ValidationError('User ID not found')
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    todos: async (_:any, args:any): Promise<TodosDto[]> => {
      try {
        return await TodoRepository.getTodos(args.completed)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    todo: async (_: any, args: any): Promise<TodosDto | undefined> => {
      try {
        return await TodoRepository.getTodo(args.id)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    tags: async (): Promise<TagsDto[]> => {
      try {
        return await TodoRepository.getTags()
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  }
};

console.info('Defining server')

const server = new ApolloServer({
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

import { makeExecutableSchema } from 'graphql-tools'

import TagsDto from "../../../common/Dtos/TagsDto";
import TodosDto from '../../../common/Dtos/TodosDto'
import UserDto from '../../../common/Dtos/UserDto'
import { ITodo } from "../../../common/Interfaces/ITodo";
import IUser from "../../../common/Interfaces/IUser";
import TodoRepository from '../repository/TodoRepository'
import * as errorConstants from '../../../common/constants/errorConstants'

import ValidationError from '../errors/validationError'
import ServerError from '../errors/error'
import IError from '../interfaces/IError';
import QueryVariables from '../types/QueryVariables';

// Construct a schema, using GraphQL schema language
// Defines the shape of data available & a query (Defines the entry points into the api)
/* 
Ex: type Query {
      hello: String
    }
*/

console.info('Writing types')
const typeDefs =`
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
}`


// Database access here...
console.info('Writing resolver')

const resolvers = {
  Todo: {
    tags: async (todo: ITodo): Promise<TagsDto[]> => {
      try {
        return await TodoRepository.getTagsByTodo(todo.id)
      } catch (error) {
        throw new ServerError(error)
      }
    },
  },
  Query: {
    user: async (_: any, { userId }: IUser): Promise<UserDto | IError> => {
      try {
        return await TodoRepository.getUser(userId)
      } catch (error) {
        throw _errorHandler(error)
      }
    },
    todos: async (_:any, { completed }:ITodo): Promise<TodosDto[]> => {
      try {
        return await TodoRepository.getTodos(completed)
      } catch (error) {
        throw new ServerError(error)
      }
    },
    todo: async (_: any, { id }: ITodo): Promise<TodosDto | undefined> => {
      try {
        return await TodoRepository.getTodo(id)
      } catch (error) {
        throw new ServerError(error)
      }
    },
    tags: async (): Promise<TagsDto[]> => {
      try {
        return await TodoRepository.getTags()
      } catch (error) {
        throw new ServerError(error)
      }
    }
  },
  Mutation: {
    updateUser: async (_: any, { user }: QueryVariables<IUser>): Promise<UserDto | IError> => {
      try {
        return await TodoRepository.updateUser(user)
      } catch (error) {
        throw _errorHandler(error)
      }
    }
  }
}

const _errorHandler = (error: Error): IError => {
  switch (error.message) {
    case errorConstants.invalidUser:
    case errorConstants.authInvalidUser:
      return new ValidationError(errorConstants.invalidUserMessage)
    default:
      return new ServerError(error);
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema

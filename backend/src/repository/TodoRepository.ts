import environment from '../types/EnvTypes'

import ITodoRepository from '../Interfaces/ITodoRepository'
import UserDto from '../Dtos/UserDto'
import TagsDto from '../Dtos/TagsDto'
import TodosDto from '../Dtos/TodosDto'

import { Firestore, QuerySnapshot, DocumentSnapshot } from '@google-cloud/firestore'
// Create a new client

const firestore = new Firestore()
const env: environment = process.env.ENVIRONMENT as environment
const baseUrl = `${env}api/routes`

console.info("Base URL", baseUrl)

const TodoRepository: ITodoRepository = {
  getUser: async userId => {
    const user: DocumentSnapshot<UserDto> = await firestore.doc(`${baseUrl}/users/${userId}`).get()
      return user.data()
  },
  getTodos: async completed => {
    const todos: QuerySnapshot<TodosDto> = await firestore.collection(`${baseUrl}/todos`)
      .where('completed', '==', completed)
      .get()
    return todos.docs.map(todo => todo.data())
  },
  getTodo: async id => {
    const todo: DocumentSnapshot<TodosDto> = await firestore.doc(`${baseUrl}/todos/todo_${id}`).get()
    return todo.data()
  },
  getTagsByTodo: async todoId => {
    const tags: QuerySnapshot<TagsDto> = await firestore.collection(`${baseUrl}/tags`)
      .where('todoRefs', 'array-contains', todoId)
      .get()
    return tags.docs.map(tag => tag.data())
  },
  getTags: async () => {
    const tags: QuerySnapshot<TagsDto> = await firestore.collection(`${baseUrl}/tags`).get()
    return tags.docs.map(tag => tag.data())
  }
}

export default TodoRepository
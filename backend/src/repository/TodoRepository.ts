import ITodoRepository from '../Interfaces/ITodoRepository'
import UserDto from '../Dtos/UserDto'
import TagsDto from '../Dtos/TagsDto'
import TodosDto from '../Dtos/TodosDto'

import { Firestore, QuerySnapshot, DocumentSnapshot } from '@google-cloud/firestore'

// Create a new client

const firestore = new Firestore();

const TodoRepository: ITodoRepository = {
  getUser: async userId => {
    const user: DocumentSnapshot<UserDto> = await firestore.doc(`users/${userId}`).get()
      return user.data()
  },
  getTodos: async completed => {
    const todos: QuerySnapshot<TodosDto> = await firestore.collection("todos")
      .where('completed', '==', completed)
      .get()
    return todos.docs.map(todo => todo.data())
  },
  getTodo: async id => {
    const todo: DocumentSnapshot<TodosDto> = await firestore.doc(`todos/todo_${id}`).get()
    return todo.data()
  },
  getTagsByTodo: async todoId => {
    const tags: QuerySnapshot<TagsDto> = await firestore.collection("tags")
      .where('todoRefs', 'array-contains', todoId)
      .get()
    return tags.docs.map(tag => tag.data())
  },
  getTags: async () => {
    const tags: QuerySnapshot<TagsDto> = await firestore.collection("tags").get()
    return tags.docs.map(tag => tag.data())
  }
}

export default TodoRepository
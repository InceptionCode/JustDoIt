import environment from '../types/EnvTypes'

import ITodoRepository from '../interfaces/ITodoRepository'
import UserDto from '../../../common/Dtos/UserDto'
import TagsDto from '../../../common/Dtos/TagsDto'
import TodosDto from '../../../common/Dtos/TodosDto'

import { grabIdFromUserId } from '../../../common/utils/stringUtils'

import { Firestore, QuerySnapshot, DocumentSnapshot } from '@google-cloud/firestore'
import { defaultAdmin } from '../index'
import IUser from '../../../common/Interfaces/IUser'
import { invalidUser } from '../../../common/constants/errorConstants'
import { resolveDto } from '../utils/DtoUtils'

const firestore = new Firestore()
const env: environment = process.env.ENVIRONMENT as environment
const baseUrl = `${env}api/routes`

console.info("Base URL", baseUrl)

const TodoRepository: ITodoRepository = {
  getUser: async userId => {
    const user: DocumentSnapshot<UserDto> = await firestore.doc(`${baseUrl}/users/${userId}`).get()

    if (!user.exists)
      throw new Error(invalidUser)
  
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
  },
  updateUser: async ({ userId, username, email }: IUser) => {
    const id = grabIdFromUserId(userId)
  
    await defaultAdmin.auth().updateUser(id, {
      displayName: username
    })

    const userDoc = firestore.doc(`${baseUrl}/users/${userId}`)
    const user: IUser = { userId, username, id, email }
  
    if ((await userDoc.get()).exists) {
      await userDoc.delete()
    }
    
    userDoc.set(user)
    const userDto: UserDto = { user }
    
    return resolveDto(userDto, "user")
  }
}

export default TodoRepository
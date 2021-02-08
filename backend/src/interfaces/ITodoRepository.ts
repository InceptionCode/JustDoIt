
// Types
import TagsDto from '../../../common/Dtos/TagsDto'
import TodosDto from '../../../common/Dtos/TodosDto'
import UserDto from '../../../common/Dtos/UserDto'
import IUser from '../../../common/Interfaces/IUser'


interface ITodoRepository {
  getTodos: (completed: boolean) => Promise<TodosDto[]>
  getUser: (userId: string) => Promise<UserDto | undefined>,
  getTagsByTodo: (todoId: string) => Promise<TagsDto[]>
  getTodo: (id: string) => Promise<TodosDto | undefined>
  getTags: () => Promise<TagsDto[]>
  updateUser(user: IUser): Promise<UserDto | undefined>
}

export default ITodoRepository
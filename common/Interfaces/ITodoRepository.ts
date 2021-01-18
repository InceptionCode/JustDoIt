
// Types
import TagsDto from '../Dtos/TagsDto'
import TodosDto from '../Dtos/TodosDto'
import UserDto from '../Dtos/UserDto'

interface ITodoRepository {
  getTodos: (completed: boolean) => Promise<TodosDto[]>
  getUser: (userId: string) => Promise<UserDto | undefined>,
  getTagsByTodo: (todoId: string) => Promise<TagsDto[]>
  getTodo: (id: string) => Promise<TodosDto | undefined>
  getTags: () => Promise<TagsDto[]>
}

export default ITodoRepository
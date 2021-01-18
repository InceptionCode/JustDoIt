import { ITag } from './ITags'

export interface ITodos {
  todos: ITodo[]
}

export interface ITodo {
  id: string
  completed: boolean
  createdBy: CreatedBy 
  tags: ITag[]
  text: string
}

type CreatedBy = {
  id: string
  username: string
}
export interface ITags {
  tags: ITag[]
}

export interface ITag {
    label: string
    id: string
    todoRefs: string[]
}
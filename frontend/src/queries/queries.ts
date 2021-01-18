import { DocumentNode, gql } from "@apollo/client"

export const GetUser = (id: string | undefined, username: string | null | undefined): DocumentNode => {
  return (gql`{
    user(userId: "${username}_${id}") {
      id
      userId
      email
      username
    }
  }` 
  )
}
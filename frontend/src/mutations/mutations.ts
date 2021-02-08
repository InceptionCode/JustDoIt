import { DocumentNode, gql } from "@apollo/client"

export const updateUser = (): DocumentNode => {
  return (gql`
    mutation UpdateUser($user: UserInput!) {
        updateUser(user: $user) {
          id
          userId
          email
          username
        }
    }`
  )
}
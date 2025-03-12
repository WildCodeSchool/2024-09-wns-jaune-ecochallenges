import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUsersAsUser {
    getUsersAsUser {
      id
      name
      email
      hashedPassword
    }
  }
`;

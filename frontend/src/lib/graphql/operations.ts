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

export const GET_ACTIONS = gql`
  query GetActions {
    getActions {
      id
      name
      description
      requires_view
      createdAt
      icon
      level
      time
    }
  }
`;

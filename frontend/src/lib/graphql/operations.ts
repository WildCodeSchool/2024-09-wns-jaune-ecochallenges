import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsersAsUser {
    getUsersAsUser {
      id
      firstname
      lastname
      email
      hashedPassword
      role
    }
  }
`;

export const GET_CHALLENGES = gql`
  query GetChallengesAsChallenge {
    getChallenges {
      id
      label
      description
      bannerUrl
      startDate
      endDate
      createdAt
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

export const MUTATION_SIGN_UP = gql`
  mutation SignUp($data: SignUpUserInput!) {
    signUp(data: $data)
  }
`;

export const MUTATION_LOG_IN = gql`
  mutation LogIn($data: LoginUserInput!) {
    logIn(data: $data)
  }
`;

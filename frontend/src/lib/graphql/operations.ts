import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsersAsUser {
    getUsersAsUser {
      id
      firstname
      lastname
      email
      role
      description
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
      isPublic
      owner {
        id
      }
      members {
        id
      }
      actions {
        id
        name
        icon
        tags {
          id
          name
          icon
        }
      }
    }
  }
`;

export const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      label
      description
      bannerUrl
      startDate
      endDate
      owner {
        id
      }
      members {
        id
      }
      actions {
        id
        tags {
          id
          name
          icon
        }
      }
    }
  }
`;

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: ChallengeInput!) {
    createChallenge(data: $data) {
      id
    }
  }
`;

export const UPDATE_CHALLENGE = gql`
  mutation UpdateChallenge($id: ID!, $data: ChallengeInput!) {
    updateChallenge(id: $id, data: $data) {
      id
    }
  }
`;

export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge($id: ID!) {
    deleteChallenge(id: $id)
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
      points
      tags {
        id
        name
        icon
      }
    }
  }
`;
export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      icon
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

export const MUTATION_LOG_OUT = gql`
  mutation LogOut {
    logOut
  }
`;

export const GET_USER_BY_ID = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      firstname
      lastname
      email
      role
      description
      avatarUrl
      participatedChallenges {
        id
        label
        startDate
        endDate
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      firstname
      lastname
      description
      avatarUrl
    }
  }
`;

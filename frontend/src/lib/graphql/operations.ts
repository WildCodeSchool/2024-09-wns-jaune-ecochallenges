import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsersAsUser {
    getUsersAsUser {
      id
      name
      email
      hashedPassword
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

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: ChallengeInput!) {
    createChallenge(data: $data) {
      id
    }
  }
`;

export const ADD_ACTIONS_TO_CHALLENGE = gql`
  mutation AddActionsToChallenge($challengeId: ID!, $actions: [ID!]!) {
    addActionsToChallenge(challengeId: $challengeId, actions: $actions) {
      id
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

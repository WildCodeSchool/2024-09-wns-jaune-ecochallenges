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
      tags {
        id
        name
      }
    }
  }
`;
export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
    }
  }
`;

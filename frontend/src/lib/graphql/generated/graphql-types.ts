import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: any; output: any };
};

export type Challenge = {
  __typename?: 'Challenge';
  bannerUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  startDate: Scalars['DateTimeISO']['output'];
};

export type Query = {
  __typename?: 'Query';
  getChallenges: Array<Challenge>;
  getUsersAsUser: Array<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GetUsersAsUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersAsUserQuery = {
  __typename?: 'Query';
  getUsersAsUser: Array<{
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
  }>;
};

export type GetChallengesAsChallengeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetChallengesAsChallengeQuery = {
  __typename?: 'Query';
  getChallenges: Array<{
    __typename?: 'Challenge';
    id: string;
    label: string;
    description?: string | null;
    bannerUrl?: string | null;
    startDate: any;
    endDate: any;
    createdAt: any;
  }>;
};

export const GetUsersAsUserDocument = gql`
  query GetUsersAsUser {
    getUsersAsUser {
      id
      name
      email
      hashedPassword
    }
  }
`;

/**
 * __useGetUsersAsUserQuery__
 *
 * To run a query within a React component, call `useGetUsersAsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersAsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersAsUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersAsUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUsersAsUserQuery,
    GetUsersAsUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersAsUserQuery, GetUsersAsUserQueryVariables>(
    GetUsersAsUserDocument,
    options
  );
}
export function useGetUsersAsUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersAsUserQuery,
    GetUsersAsUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersAsUserQuery, GetUsersAsUserQueryVariables>(
    GetUsersAsUserDocument,
    options
  );
}
export function useGetUsersAsUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUsersAsUserQuery,
        GetUsersAsUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetUsersAsUserQuery,
    GetUsersAsUserQueryVariables
  >(GetUsersAsUserDocument, options);
}
export type GetUsersAsUserQueryHookResult = ReturnType<
  typeof useGetUsersAsUserQuery
>;
export type GetUsersAsUserLazyQueryHookResult = ReturnType<
  typeof useGetUsersAsUserLazyQuery
>;
export type GetUsersAsUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersAsUserSuspenseQuery
>;
export type GetUsersAsUserQueryResult = Apollo.QueryResult<
  GetUsersAsUserQuery,
  GetUsersAsUserQueryVariables
>;
export const GetChallengesAsChallengeDocument = gql`
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

/**
 * __useGetChallengesAsChallengeQuery__
 *
 * To run a query within a React component, call `useGetChallengesAsChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengesAsChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengesAsChallengeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChallengesAsChallengeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetChallengesAsChallengeQuery,
    GetChallengesAsChallengeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetChallengesAsChallengeQuery,
    GetChallengesAsChallengeQueryVariables
  >(GetChallengesAsChallengeDocument, options);
}
export function useGetChallengesAsChallengeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChallengesAsChallengeQuery,
    GetChallengesAsChallengeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetChallengesAsChallengeQuery,
    GetChallengesAsChallengeQueryVariables
  >(GetChallengesAsChallengeDocument, options);
}
export function useGetChallengesAsChallengeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetChallengesAsChallengeQuery,
        GetChallengesAsChallengeQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetChallengesAsChallengeQuery,
    GetChallengesAsChallengeQueryVariables
  >(GetChallengesAsChallengeDocument, options);
}
export type GetChallengesAsChallengeQueryHookResult = ReturnType<
  typeof useGetChallengesAsChallengeQuery
>;
export type GetChallengesAsChallengeLazyQueryHookResult = ReturnType<
  typeof useGetChallengesAsChallengeLazyQuery
>;
export type GetChallengesAsChallengeSuspenseQueryHookResult = ReturnType<
  typeof useGetChallengesAsChallengeSuspenseQuery
>;
export type GetChallengesAsChallengeQueryResult = Apollo.QueryResult<
  GetChallengesAsChallengeQuery,
  GetChallengesAsChallengeQueryVariables
>;

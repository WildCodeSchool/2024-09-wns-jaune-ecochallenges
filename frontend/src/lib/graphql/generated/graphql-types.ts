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

export type Action = {
  __typename?: 'Action';
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['String']['output'];
  level: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  requires_view: Scalars['Boolean']['output'];
  time: Scalars['Float']['output'];
};

export type ActionInput = {
  description: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  level: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  requires_view: Scalars['Boolean']['input'];
  time: Scalars['Float']['input'];
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

export type LoginUserInput = {
  email: Scalars['String']['input'];
  hashedPassword: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createdAction: Action;
  logIn: Scalars['String']['output'];
  singUp: Scalars['String']['output'];
};

export type MutationCreatedActionArgs = {
  data: ActionInput;
};

export type MutationLogInArgs = {
  data: LoginUserInput;
};

export type MutationSingUpArgs = {
  data: SingUpUserInput;
};

export type Query = {
  __typename?: 'Query';
  getActionById: Action;
  getActions: Array<Action>;
  getChallenges: Array<Challenge>;
  getUsersAsUser: Array<User>;
};

export type QueryGetActionByIdArgs = {
  id: Scalars['String']['input'];
};

export type SingUpUserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  hashedPassword: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  roles: Scalars['String']['output'];
};

export type GetUsersAsUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersAsUserQuery = {
  __typename?: 'Query';
  getUsersAsUser: Array<{
    __typename?: 'User';
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    hashedPassword: string;
    roles: string;
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

export type GetActionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetActionsQuery = {
  __typename?: 'Query';
  getActions: Array<{
    __typename?: 'Action';
    id: string;
    name: string;
    description: string;
    requires_view: boolean;
    createdAt: any;
    icon: string;
    level: number;
    time: number;
  }>;
};

export type SingUpMutationVariables = Exact<{
  data: SingUpUserInput;
}>;

export type SingUpMutation = { __typename?: 'Mutation'; singUp: string };

export type LogInMutationVariables = Exact<{
  data: LoginUserInput;
}>;

export type LogInMutation = { __typename?: 'Mutation'; logIn: string };

export const GetUsersAsUserDocument = gql`
  query GetUsersAsUser {
    getUsersAsUser {
      id
      firstname
      lastname
      email
      hashedPassword
      roles
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
export const GetActionsDocument = gql`
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

/**
 * __useGetActionsQuery__
 *
 * To run a query within a React component, call `useGetActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActionsQuery,
    GetActionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetActionsQuery, GetActionsQueryVariables>(
    GetActionsDocument,
    options
  );
}
export function useGetActionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActionsQuery,
    GetActionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetActionsQuery, GetActionsQueryVariables>(
    GetActionsDocument,
    options
  );
}
export function useGetActionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetActionsQuery, GetActionsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetActionsQuery, GetActionsQueryVariables>(
    GetActionsDocument,
    options
  );
}
export type GetActionsQueryHookResult = ReturnType<typeof useGetActionsQuery>;
export type GetActionsLazyQueryHookResult = ReturnType<
  typeof useGetActionsLazyQuery
>;
export type GetActionsSuspenseQueryHookResult = ReturnType<
  typeof useGetActionsSuspenseQuery
>;
export type GetActionsQueryResult = Apollo.QueryResult<
  GetActionsQuery,
  GetActionsQueryVariables
>;
export const SingUpDocument = gql`
  mutation SingUp($data: SingUpUserInput!) {
    singUp(data: $data)
  }
`;
export type SingUpMutationFn = Apollo.MutationFunction<
  SingUpMutation,
  SingUpMutationVariables
>;

/**
 * __useSingUpMutation__
 *
 * To run a mutation, you first call `useSingUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singUpMutation, { data, loading, error }] = useSingUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSingUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SingUpMutation,
    SingUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SingUpMutation, SingUpMutationVariables>(
    SingUpDocument,
    options
  );
}
export type SingUpMutationHookResult = ReturnType<typeof useSingUpMutation>;
export type SingUpMutationResult = Apollo.MutationResult<SingUpMutation>;
export type SingUpMutationOptions = Apollo.BaseMutationOptions<
  SingUpMutation,
  SingUpMutationVariables
>;
export const LogInDocument = gql`
  mutation LogIn($data: LoginUserInput!) {
    logIn(data: $data)
  }
`;
export type LogInMutationFn = Apollo.MutationFunction<
  LogInMutation,
  LogInMutationVariables
>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLogInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogInMutation,
    LogInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogInMutation, LogInMutationVariables>(
    LogInDocument,
    options
  );
}
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<
  LogInMutation,
  LogInMutationVariables
>;

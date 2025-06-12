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
  challenges: Array<Challenge>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  requires_view: Scalars['Boolean']['output'];
  tags?: Maybe<Array<Tag>>;
  time: Scalars['Float']['output'];
  userActionChallenges: Array<UserActionChallenge>;
};

export type ActionInput = {
  description: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  level: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  requires_view: Scalars['Boolean']['input'];
  tags: Array<Scalars['ID']['input']>;
  time: Scalars['Float']['input'];
};

export type Challenge = {
  __typename?: 'Challenge';
  actions: Array<Action>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  members: Array<User>;
  owner: User;
  startDate: Scalars['DateTimeISO']['output'];
  userActionChallenges: Array<UserActionChallenge>;
};

export type ChallengeInput = {
  actions: Array<Scalars['ID']['input']>;
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTimeISO']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  members: Array<Scalars['ID']['input']>;
  startDate: Scalars['DateTimeISO']['input'];
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  hashedPassword: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChallenge: Challenge;
  createUserActionChallenge: UserActionChallenge;
  createdAction: Action;
  deleteChallenge: Scalars['Boolean']['output'];
  logIn: Scalars['String']['output'];
  logOut: Scalars['Boolean']['output'];
  signUp: Scalars['String']['output'];
  updateChallenge: Challenge;
  updateUserActionChallenge: UserActionChallenge;
};

export type MutationCreateChallengeArgs = {
  data: ChallengeInput;
};

export type MutationCreateUserActionChallengeArgs = {
  data: UserActionChallengeInput;
};

export type MutationCreatedActionArgs = {
  data: ActionInput;
};

export type MutationDeleteChallengeArgs = {
  id: Scalars['ID']['input'];
};

export type MutationLogInArgs = {
  data: LoginUserInput;
};

export type MutationSignUpArgs = {
  data: SignUpUserInput;
};

export type MutationUpdateChallengeArgs = {
  data: ChallengeInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUserActionChallengeArgs = {
  data: UserActionChallengeInput;
};

export type Query = {
  __typename?: 'Query';
  getActionById: Action;
  getActions: Array<Action>;
  getActionsByChallengeId: Array<Action>;
  getAllTags: Array<Tag>;
  getChallenge: Challenge;
  getChallenges: Array<Challenge>;
  getUserActionChallenge: UserActionChallenge;
  getUserActionChallenges: Array<UserActionChallenge>;
  getUsersAsUser: Array<User>;
};

export type QueryGetActionByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetActionsByChallengeIdArgs = {
  challengeId: Scalars['String']['input'];
};

export type QueryGetChallengeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetUserActionChallengeArgs = {
  id: Scalars['String']['input'];
};

export type SignUpUserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  hashedPassword: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  actions?: Maybe<Array<Action>>;
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  createdChallenges: Array<Challenge>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  participatedChallenges: Array<Challenge>;
  role: Scalars['String']['output'];
  userActionChallenges: Array<UserActionChallenge>;
};

export type UserActionChallenge = {
  __typename?: 'UserActionChallenge';
  action: Action;
  challenge: Challenge;
  comment: Scalars['String']['output'];
  status: Scalars['String']['output'];
  user: User;
};

export type UserActionChallengeInput = {
  actionId: Scalars['ID']['input'];
  challengeId: Scalars['ID']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
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
    role: string;
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
    isPublic: boolean;
    owner: { __typename?: 'User'; id: string };
    members: Array<{ __typename?: 'User'; id: string }>;
    actions: Array<{
      __typename?: 'Action';
      id: string;
      name: string;
      icon: string;
      tags?: Array<{
        __typename?: 'Tag';
        id: string;
        name: string;
        icon: string;
      }> | null;
    }>;
  }>;
};

export type GetChallengeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetChallengeQuery = {
  __typename?: 'Query';
  getChallenge: {
    __typename?: 'Challenge';
    id: string;
    label: string;
    description?: string | null;
    bannerUrl?: string | null;
    startDate: any;
    endDate: any;
    owner: { __typename?: 'User'; id: string };
    members: Array<{ __typename?: 'User'; id: string }>;
    actions: Array<{
      __typename?: 'Action';
      id: string;
      tags?: Array<{
        __typename?: 'Tag';
        id: string;
        name: string;
        icon: string;
      }> | null;
    }>;
  };
};

export type CreateChallengeMutationVariables = Exact<{
  data: ChallengeInput;
}>;

export type CreateChallengeMutation = {
  __typename?: 'Mutation';
  createChallenge: { __typename?: 'Challenge'; id: string };
};

export type UpdateChallengeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: ChallengeInput;
}>;

export type UpdateChallengeMutation = {
  __typename?: 'Mutation';
  updateChallenge: { __typename?: 'Challenge'; id: string };
};

export type DeleteChallengeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteChallengeMutation = {
  __typename?: 'Mutation';
  deleteChallenge: boolean;
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
    tags?: Array<{
      __typename?: 'Tag';
      id: string;
      name: string;
      icon: string;
    }> | null;
  }>;
};

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTagsQuery = {
  __typename?: 'Query';
  getAllTags: Array<{
    __typename?: 'Tag';
    id: string;
    name: string;
    icon: string;
  }>;
};

export type SignUpMutationVariables = Exact<{
  data: SignUpUserInput;
}>;

export type SignUpMutation = { __typename?: 'Mutation'; signUp: string };

export type LogInMutationVariables = Exact<{
  data: LoginUserInput;
}>;

export type LogInMutation = { __typename?: 'Mutation'; logIn: string };

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { __typename?: 'Mutation'; logOut: boolean };

export type GetActionsByChallengeIdQueryVariables = Exact<{
  challengeId: Scalars['String']['input'];
}>;

export type GetActionsByChallengeIdQuery = {
  __typename?: 'Query';
  getActionsByChallengeId: Array<{
    __typename?: 'Action';
    id: string;
    name: string;
    description: string;
    requires_view: boolean;
    createdAt: any;
    icon: string;
    level: number;
    time: number;
    tags?: Array<{
      __typename?: 'Tag';
      id: string;
      name: string;
      icon: string;
    }> | null;
  }>;
};

export type CreateUserActionChallengeMutationVariables = Exact<{
  data: UserActionChallengeInput;
}>;

export type CreateUserActionChallengeMutation = {
  __typename?: 'Mutation';
  createUserActionChallenge: {
    __typename?: 'UserActionChallenge';
    user: { __typename?: 'User'; firstname: string };
    challenge: { __typename?: 'Challenge'; id: string };
    action: { __typename?: 'Action'; id: string };
  };
};

export type ActionByChallengeWithStatusQueryVariables = Exact<{
  getChallengeId: Scalars['ID']['input'];
}>;

export type ActionByChallengeWithStatusQuery = {
  __typename?: 'Query';
  getChallenge: {
    __typename?: 'Challenge';
    startDate: any;
    label: string;
    isPublic: boolean;
    id: string;
    endDate: any;
    description?: string | null;
    createdAt: any;
    bannerUrl?: string | null;
    owner: { __typename?: 'User'; id: string };
    members: Array<{
      __typename?: 'User';
      id: string;
      lastname: string;
      firstname: string;
      role: string;
    }>;
    actions: Array<{
      __typename?: 'Action';
      id: string;
      name: string;
      description: string;
      requires_view: boolean;
      level: number;
      icon: string;
      time: number;
      createdAt: any;
      tags?: Array<{
        __typename?: 'Tag';
        id: string;
        name: string;
        icon: string;
      }> | null;
    }>;
    userActionChallenges: Array<{
      __typename?: 'UserActionChallenge';
      status: string;
      user: { __typename?: 'User'; id: string };
      challenge: { __typename?: 'Challenge'; id: string };
      action: { __typename?: 'Action'; id: string };
    }>;
  };
};

export const GetUsersAsUserDocument = gql`
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
export const GetChallengeDocument = gql`
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

/**
 * __useGetChallengeQuery__
 *
 * To run a query within a React component, call `useGetChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChallengeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetChallengeQuery,
    GetChallengeQueryVariables
  > &
    (
      | { variables: GetChallengeQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChallengeQuery, GetChallengeQueryVariables>(
    GetChallengeDocument,
    options
  );
}
export function useGetChallengeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChallengeQuery,
    GetChallengeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChallengeQuery, GetChallengeQueryVariables>(
    GetChallengeDocument,
    options
  );
}
export function useGetChallengeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetChallengeQuery,
        GetChallengeQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetChallengeQuery, GetChallengeQueryVariables>(
    GetChallengeDocument,
    options
  );
}
export type GetChallengeQueryHookResult = ReturnType<
  typeof useGetChallengeQuery
>;
export type GetChallengeLazyQueryHookResult = ReturnType<
  typeof useGetChallengeLazyQuery
>;
export type GetChallengeSuspenseQueryHookResult = ReturnType<
  typeof useGetChallengeSuspenseQuery
>;
export type GetChallengeQueryResult = Apollo.QueryResult<
  GetChallengeQuery,
  GetChallengeQueryVariables
>;
export const CreateChallengeDocument = gql`
  mutation CreateChallenge($data: ChallengeInput!) {
    createChallenge(data: $data) {
      id
    }
  }
`;
export type CreateChallengeMutationFn = Apollo.MutationFunction<
  CreateChallengeMutation,
  CreateChallengeMutationVariables
>;

/**
 * __useCreateChallengeMutation__
 *
 * To run a mutation, you first call `useCreateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeMutation, { data, loading, error }] = useCreateChallengeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >(CreateChallengeDocument, options);
}
export type CreateChallengeMutationHookResult = ReturnType<
  typeof useCreateChallengeMutation
>;
export type CreateChallengeMutationResult =
  Apollo.MutationResult<CreateChallengeMutation>;
export type CreateChallengeMutationOptions = Apollo.BaseMutationOptions<
  CreateChallengeMutation,
  CreateChallengeMutationVariables
>;
export const UpdateChallengeDocument = gql`
  mutation UpdateChallenge($id: ID!, $data: ChallengeInput!) {
    updateChallenge(id: $id, data: $data) {
      id
    }
  }
`;
export type UpdateChallengeMutationFn = Apollo.MutationFunction<
  UpdateChallengeMutation,
  UpdateChallengeMutationVariables
>;

/**
 * __useUpdateChallengeMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeMutation, { data, loading, error }] = useUpdateChallengeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >(UpdateChallengeDocument, options);
}
export type UpdateChallengeMutationHookResult = ReturnType<
  typeof useUpdateChallengeMutation
>;
export type UpdateChallengeMutationResult =
  Apollo.MutationResult<UpdateChallengeMutation>;
export type UpdateChallengeMutationOptions = Apollo.BaseMutationOptions<
  UpdateChallengeMutation,
  UpdateChallengeMutationVariables
>;
export const DeleteChallengeDocument = gql`
  mutation DeleteChallenge($id: ID!) {
    deleteChallenge(id: $id)
  }
`;
export type DeleteChallengeMutationFn = Apollo.MutationFunction<
  DeleteChallengeMutation,
  DeleteChallengeMutationVariables
>;

/**
 * __useDeleteChallengeMutation__
 *
 * To run a mutation, you first call `useDeleteChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChallengeMutation, { data, loading, error }] = useDeleteChallengeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteChallengeMutation,
    DeleteChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteChallengeMutation,
    DeleteChallengeMutationVariables
  >(DeleteChallengeDocument, options);
}
export type DeleteChallengeMutationHookResult = ReturnType<
  typeof useDeleteChallengeMutation
>;
export type DeleteChallengeMutationResult =
  Apollo.MutationResult<DeleteChallengeMutation>;
export type DeleteChallengeMutationOptions = Apollo.BaseMutationOptions<
  DeleteChallengeMutation,
  DeleteChallengeMutationVariables
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
      tags {
        id
        name
        icon
      }
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
export const GetAllTagsDocument = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      icon
    }
  }
`;

/**
 * __useGetAllTagsQuery__
 *
 * To run a query within a React component, call `useGetAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllTagsQuery,
    GetAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export function useGetAllTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTagsQuery,
    GetAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export function useGetAllTagsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<
  typeof useGetAllTagsLazyQuery
>;
export type GetAllTagsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllTagsSuspenseQuery
>;
export type GetAllTagsQueryResult = Apollo.QueryResult<
  GetAllTagsQuery,
  GetAllTagsQueryVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($data: SignUpUserInput!) {
    signUp(data: $data)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
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
export const LogOutDocument = gql`
  mutation LogOut {
    logOut
  }
`;
export type LogOutMutationFn = Apollo.MutationFunction<
  LogOutMutation,
  LogOutMutationVariables
>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogOutMutation,
    LogOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(
    LogOutDocument,
    options
  );
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<
  LogOutMutation,
  LogOutMutationVariables
>;
export const GetActionsByChallengeIdDocument = gql`
  query GetActionsByChallengeId($challengeId: String!) {
    getActionsByChallengeId(challengeId: $challengeId) {
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
        icon
      }
    }
  }
`;

/**
 * __useGetActionsByChallengeIdQuery__
 *
 * To run a query within a React component, call `useGetActionsByChallengeIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActionsByChallengeIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActionsByChallengeIdQuery({
 *   variables: {
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useGetActionsByChallengeIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetActionsByChallengeIdQuery,
    GetActionsByChallengeIdQueryVariables
  > &
    (
      | { variables: GetActionsByChallengeIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetActionsByChallengeIdQuery,
    GetActionsByChallengeIdQueryVariables
  >(GetActionsByChallengeIdDocument, options);
}
export function useGetActionsByChallengeIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActionsByChallengeIdQuery,
    GetActionsByChallengeIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetActionsByChallengeIdQuery,
    GetActionsByChallengeIdQueryVariables
  >(GetActionsByChallengeIdDocument, options);
}
export function useGetActionsByChallengeIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetActionsByChallengeIdQuery,
        GetActionsByChallengeIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetActionsByChallengeIdQuery,
    GetActionsByChallengeIdQueryVariables
  >(GetActionsByChallengeIdDocument, options);
}
export type GetActionsByChallengeIdQueryHookResult = ReturnType<
  typeof useGetActionsByChallengeIdQuery
>;
export type GetActionsByChallengeIdLazyQueryHookResult = ReturnType<
  typeof useGetActionsByChallengeIdLazyQuery
>;
export type GetActionsByChallengeIdSuspenseQueryHookResult = ReturnType<
  typeof useGetActionsByChallengeIdSuspenseQuery
>;
export type GetActionsByChallengeIdQueryResult = Apollo.QueryResult<
  GetActionsByChallengeIdQuery,
  GetActionsByChallengeIdQueryVariables
>;
export const CreateUserActionChallengeDocument = gql`
  mutation CreateUserActionChallenge($data: UserActionChallengeInput!) {
    createUserActionChallenge(data: $data) {
      user {
        firstname
      }
      challenge {
        id
      }
      action {
        id
      }
    }
  }
`;
export type CreateUserActionChallengeMutationFn = Apollo.MutationFunction<
  CreateUserActionChallengeMutation,
  CreateUserActionChallengeMutationVariables
>;

/**
 * __useCreateUserActionChallengeMutation__
 *
 * To run a mutation, you first call `useCreateUserActionChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserActionChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserActionChallengeMutation, { data, loading, error }] = useCreateUserActionChallengeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserActionChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserActionChallengeMutation,
    CreateUserActionChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUserActionChallengeMutation,
    CreateUserActionChallengeMutationVariables
  >(CreateUserActionChallengeDocument, options);
}
export type CreateUserActionChallengeMutationHookResult = ReturnType<
  typeof useCreateUserActionChallengeMutation
>;
export type CreateUserActionChallengeMutationResult =
  Apollo.MutationResult<CreateUserActionChallengeMutation>;
export type CreateUserActionChallengeMutationOptions =
  Apollo.BaseMutationOptions<
    CreateUserActionChallengeMutation,
    CreateUserActionChallengeMutationVariables
  >;
export const ActionByChallengeWithStatusDocument = gql`
  query actionByChallengeWithStatus($getChallengeId: ID!) {
    getChallenge(id: $getChallengeId) {
      startDate
      owner {
        id
      }
      members {
        id
        lastname
        firstname
        role
      }
      label
      isPublic
      id
      endDate
      description
      createdAt
      bannerUrl
      actions {
        id
        name
        description
        requires_view
        level
        icon
        time
        createdAt
        tags {
          id
          name
          icon
        }
      }
      userActionChallenges {
        user {
          id
        }
        status
        challenge {
          id
        }
        action {
          id
        }
      }
    }
  }
`;

/**
 * __useActionByChallengeWithStatusQuery__
 *
 * To run a query within a React component, call `useActionByChallengeWithStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useActionByChallengeWithStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActionByChallengeWithStatusQuery({
 *   variables: {
 *      getChallengeId: // value for 'getChallengeId'
 *   },
 * });
 */
export function useActionByChallengeWithStatusQuery(
  baseOptions: Apollo.QueryHookOptions<
    ActionByChallengeWithStatusQuery,
    ActionByChallengeWithStatusQueryVariables
  > &
    (
      | { variables: ActionByChallengeWithStatusQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ActionByChallengeWithStatusQuery,
    ActionByChallengeWithStatusQueryVariables
  >(ActionByChallengeWithStatusDocument, options);
}
export function useActionByChallengeWithStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ActionByChallengeWithStatusQuery,
    ActionByChallengeWithStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ActionByChallengeWithStatusQuery,
    ActionByChallengeWithStatusQueryVariables
  >(ActionByChallengeWithStatusDocument, options);
}
export function useActionByChallengeWithStatusSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ActionByChallengeWithStatusQuery,
        ActionByChallengeWithStatusQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ActionByChallengeWithStatusQuery,
    ActionByChallengeWithStatusQueryVariables
  >(ActionByChallengeWithStatusDocument, options);
}
export type ActionByChallengeWithStatusQueryHookResult = ReturnType<
  typeof useActionByChallengeWithStatusQuery
>;
export type ActionByChallengeWithStatusLazyQueryHookResult = ReturnType<
  typeof useActionByChallengeWithStatusLazyQuery
>;
export type ActionByChallengeWithStatusSuspenseQueryHookResult = ReturnType<
  typeof useActionByChallengeWithStatusSuspenseQuery
>;
export type ActionByChallengeWithStatusQueryResult = Apollo.QueryResult<
  ActionByChallengeWithStatusQuery,
  ActionByChallengeWithStatusQueryVariables
>;

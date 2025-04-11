import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: '/api',
  credentials: 'include',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

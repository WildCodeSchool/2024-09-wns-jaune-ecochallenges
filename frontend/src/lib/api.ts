import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `http://localhost:${import.meta.env.VITE_GATEWAY_PORT}/api`,
  cache: new InMemoryCache(),
});

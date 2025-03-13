import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from './config/db';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { ChallengeResolver } from './resolvers/ChallengeResolver';

const port = 4005;

async function start() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, ChallengeResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
start();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from './config/db';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { config } from 'dotenv';

config();
const port = Number(process.env.BACKEND_PORT);
if (!port) throw new Error('Missing env variable: BACKEND_PORT');

async function start() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port, host: '0.0.0.0' },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
start();

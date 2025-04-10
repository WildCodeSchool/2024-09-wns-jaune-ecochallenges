import 'reflect-metadata';
import { config } from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { dataSource } from '@/config/db';
import { ActionResolver, ChallengeResolver, UserResolver } from '@/resolvers';
import { authChecker } from './auth/authChecker';
import * as jwt from 'jsonwebtoken';

config();
const port = Number(process.env.BACKEND_PORT);
if (!port) throw new Error('Missing env variable: BACKEND_PORT');

async function start() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, ChallengeResolver, ActionResolver],
    authChecker: authChecker,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: port, host: '0.0.0.0' },
    context: async ({ req, res }) => {
      const token = req.headers.cookie?.split('token=')[1];
      if (token && process.env.JWT_SECRET) {
        const tokenContent = jwt.verify(token, process.env.JWT_SECRET);
        return {
          res,
          user: tokenContent,
        };
      }
      return {
        res,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
start();

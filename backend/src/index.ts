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
    listen: { port: port },
    context: async ({ req, res }) => {
      try {
        const token = req.headers.cookie?.split('access_token=')[1];

        if (token && process.env.JWT_SECRET) {
          const tokenContent = jwt.verify(token, process.env.JWT_SECRET);
          return {
            res,
            req,
            user: tokenContent,
          };
        }
        return {
          res,
          req,
        };
      } catch (e) {
        return {
          res,
          req,
        };
      }
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
}
start();

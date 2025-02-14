import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import { UserResolver } from "./resolvers/UserResolver";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

const port = 4000;

async function start() {
  await dataSource.initialize();
  
  const schema = await buildSchema({
      resolvers: [UserResolver],
    });
    
    const server = new ApolloServer({ schema });
    
    const { url } = await startStandaloneServer(server, {
      listen: { port: port }
    });
    
    console.log(`🚀  Server ready at: ${url}`);
    }
    start()

import { GraphQLServer } from 'graphql-yoga'
import dotenv from "dotenv";
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import authenticate from './lib/authenticate';
import models from "./models";

dotenv.config();
const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers: {
    Query,
    Mutation
  },
  context: req => ({ ...req, models, loggedInUser: () => authenticate(req, models) }),
})

function listen() {
  server.start({ PORT = 3001 }, () => {
    console.log(`The server is up on port ${PORT}!`);
  })
}
listen();
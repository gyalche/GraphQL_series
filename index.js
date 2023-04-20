import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/type-defs.js';
import resolvers from './schema/resolvers.js';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(3001).then(({ url }) => {
  console.log(`Server is listening to ${url}`);
});

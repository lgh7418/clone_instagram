require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hi"
  }
};

// const server = new GraphQLServer({ typeDefs, resolvers });
const server = new GraphQLServer({ schema });

// GraphQLServer에는 express 서버가 내장되어 있음
// express 서버에서 logger 미들웨어를 사용하도록 할 거임. 옵션은 dev
server.express.use(logger("dev"));

server.start({ port: PORT }, () => console.log(`Server running on http://localhost:${PORT}`));

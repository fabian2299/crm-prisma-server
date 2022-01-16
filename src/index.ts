import { ApolloServer } from "apollo-server-express";
import http from "http";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

import resolvers from "./resolvers";
import app from "./server";

const httpServer = http.createServer(app);
const typeDefs = readFileSync(path.join(__dirname, "schema.graphql"), "utf8");
const orm = new PrismaClient();

const port = process.env.PORT || 4000;

export default async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      let user: jwt.JwtPayload | undefined;

      if (token) {
        try {
          user = await jwt.verify(token, process.env.SECRETA!);
        } catch (error) {
          console.log(error);
        }
      }

      return {
        orm,
        user,
      };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

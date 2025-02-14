import Fastify from "fastify";
import { makeListUsersController } from "../factories/makeListUsersController";
import { routeAdapter } from "./adapters/routeAdapter";
import { userRoutes } from "./routes/userRoutes";

const fastify = Fastify();

fastify.register(userRoutes, { prefix: "users" });

fastify.get(
  "/list-users",
  {
    preHandler: (request, reply, done) => {
      const authorization = request.headers.authorization;
      if (!authorization) return reply.code(401).send({});
      done();
    },
  },
  routeAdapter(makeListUsersController())
);

export async function main() {
  try {
    fastify.listen({ port: 3001 }, () => {
      console.log("> server started at http://localhost:3001");
    });
  } catch (error) {
    console.log(error);
  }
}

main();

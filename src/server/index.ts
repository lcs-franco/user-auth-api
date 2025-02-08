import Fastify from "fastify";
import { makeListUsersController } from "../factories/makeListUsersController";
import { makeSignInController } from "../factories/makeSignInController";
import { makeSignUpController } from "../factories/makeSignUpController";
import { routeAdapter } from "./adapters/routeAdapter";

const fastify = Fastify();

fastify.post("/sign-up", routeAdapter(makeSignUpController()));
fastify.post("/sign-in", routeAdapter(makeSignInController()));

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

import Fastify, { FastifyRequest } from "fastify";
import { makeSignInController } from "../factories/makeSignInController";
import { makeSignUpController } from "../factories/makeSignUpController";

const fastify = Fastify();

type Request = FastifyRequest<{ Body: Record<string, any> }>;

fastify.post("/sign-up", async (request: Request, reply) => {
  const signUpController = makeSignUpController();

  const { body, statusCode } = await signUpController.handle({
    body: request.body,
  });

  return reply.code(statusCode).send(body);
});

fastify.post("/sign-in", async (request: Request, reply) => {
  const signInController = makeSignInController();

  const { body, statusCode } = await signInController.handle({
    body: request.body,
  });

  return reply.code(statusCode).send(body);
});

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

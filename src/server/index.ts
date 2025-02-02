import Fastify, { FastifyRequest } from "fastify";
import { SignInContoller } from "../app/controllers/SignInController";
import { SignUpController } from "../app/controllers/SignUpController";
import { SignInUseCase } from "../app/useCases/SignInUseCase";
import { SignUpUseCase } from "../app/useCases/SignUpUseCase";

const fastify = Fastify();

type Request = FastifyRequest<{ Body: Record<string, any> }>;

fastify.post("/sign-up", async (request: Request, reply) => {
  const SALT = 10;
  const signUpUseCase = new SignUpUseCase(SALT);
  const signUpController = new SignUpController(signUpUseCase);

  const { body, statusCode } = await signUpController.handle({
    body: request.body,
  });

  return reply.code(statusCode).send(body);
});

fastify.post("/sign-in", async (request: Request, reply) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInContoller(signInUseCase);

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

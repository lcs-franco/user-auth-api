import Fastify, { FastifyRequest } from "fastify";
import { SignUpController } from "../app/controllers/SignUpController";
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

export async function main() {
  try {
    fastify.listen({ port: 3001 }, () => {
      console.log("> server started at http://localhost:3001");
    });
  } catch (error) {
    console.log(error);
  }
}

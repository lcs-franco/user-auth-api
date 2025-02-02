import Fastify, { FastifyRequest } from "fastify";
import { SignUpController } from "../app/controllers/SignUpController";
import { SignUpUseCase } from "../app/useCases/SignUpUseCase";

const fastify = Fastify();

export async function main() {
  try {
    fastify.listen({ port: 3001 }, () => {
      console.log("> server started at http://localhost:3001");
    });
  } catch (error) {
    console.log(error);
  }
}

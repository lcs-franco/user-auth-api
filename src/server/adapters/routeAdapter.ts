import { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../../app/interfaces/IController";

type Request = FastifyRequest<{
  Body: Record<string, any>;
  Params: Record<string, string>;
}>;

export function routeAdapter(controller: IController) {
  return async (request: Request, reply: FastifyReply) => {
    const { body, statusCode } = await controller.handle({
      body: request.body,
      params: request.params,
    });

    reply.code(statusCode).send(body);
  };
}

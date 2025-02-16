import { FastifyReply, FastifyRequest } from 'fastify';
import { IController } from '../../app/interfaces/IController';

type Request = FastifyRequest<{
  Body: Record<string, any>;
  Params: Record<string, string>;
}>;

type Reply = FastifyReply;

export function routeAdapter(controller: IController) {
  return async (request: Request, reply: Reply) => {
    const { body, statusCode } = await controller.handle({
      body: request.body,
      params: request.params,
      accountId: request.metadata?.accountId,
    });

    reply.code(statusCode).send(body);
  };
}

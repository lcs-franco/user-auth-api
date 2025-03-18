import { IController } from '@app/interfaces/IController';
import { FastifyReply, FastifyRequest } from 'fastify';

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
      account: request.metadata?.account,
      query: request.query as Record<string, any>,
      headers: request.headers as Record<string, string>,
    });

    reply.code(statusCode).send(body);
  };
}

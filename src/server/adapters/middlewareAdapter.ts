import { FastifyReply, FastifyRequest } from 'fastify';
import { IMiddleware } from '../../app/interfaces/IMiddleware';

type Request = FastifyRequest<{
  Body: Record<string, any>;
  Params: Record<string, string>;
}>;

type Reply = FastifyReply;

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, reply: Reply) => {
    const result = await middleware.handle({
      body: request.body,
      params: request.params,
      account: request.metadata?.account,
      headers: request.headers as Record<string, string>,
    });

    if ('statusCode' in result) {
      return reply.code(result.statusCode).send(result.body);
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };
  };
}

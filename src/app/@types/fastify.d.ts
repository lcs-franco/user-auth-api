import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    metadata?: {
      accountId?: string;
    };
  }
}

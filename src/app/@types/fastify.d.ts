import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    metadata?: {
      account?: {
        accountId: string;
        role: string;
      };
    };
  }
}

import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    metadata?: {
      account?: {
        id: string;
        roleId: string;
      };
    };
  }
}

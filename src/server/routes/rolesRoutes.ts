import { makeAuthenticationMiddleware } from '@factories/middlewares/makeAuthenticationMiddleware';
import { makeCreateRoleController } from '@factories/roles/makeCreateRoleController';
import { middlewareAdapter } from '@server/adapters/middlewareAdapter';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';
import { makeListRoleController } from '@factories/roles/makeListRoleController';

export async function rolesRoutes(fastify: FastifyInstance) {
  fastify.addHook(
    'preHandler',
    middlewareAdapter(makeAuthenticationMiddleware())
  );

  fastify.post('/', routeAdapter(makeCreateRoleController()));
  fastify.get('/', routeAdapter(makeListRoleController()));
}

import { makeAuthenticationMiddleware } from '@factories/middlewares/makeAuthenticationMiddleware';
import { makeCreateRoleController } from '@factories/roles/makeCreateRoleController';
import { makeDeleteRoleController } from '@factories/roles/makeDeleteRoleController';
import { makeListRoleController } from '@factories/roles/makeListRoleController';
import { makeUpdateRoleController } from '@factories/roles/makeUpdateRoleController';
import { middlewareAdapter } from '@server/adapters/middlewareAdapter';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';

export async function rolesRoutes(fastify: FastifyInstance) {
  fastify.addHook(
    'preHandler',
    middlewareAdapter(makeAuthenticationMiddleware())
  );

  fastify.post('/', routeAdapter(makeCreateRoleController()));
  fastify.get('/', routeAdapter(makeListRoleController()));
  fastify.put('/:id', routeAdapter(makeUpdateRoleController()));
  fastify.delete('/:id', routeAdapter(makeDeleteRoleController()));
}

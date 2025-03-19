import { makeAuthenticationMiddleware } from '@factories/middlewares/makeAuthenticationMiddleware';
import { makeCreatePermissionController } from '@factories/permissions/makeCreatePermissionController';
import { makeListPermissionController } from '@factories/permissions/makeListPermissionController';
import { makeUpdatePermissionController } from '@factories/permissions/makeUpdatePermissionController';
import { middlewareAdapter } from '@server/adapters/middlewareAdapter';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';

export async function permissionsRoutes(fastify: FastifyInstance) {
  fastify.addHook(
    'preHandler',
    middlewareAdapter(makeAuthenticationMiddleware())
  );

  fastify.post('/', routeAdapter(makeCreatePermissionController()));
  fastify.get('/', routeAdapter(makeListPermissionController()));
  fastify.put('/:id', routeAdapter(makeUpdatePermissionController()));
}

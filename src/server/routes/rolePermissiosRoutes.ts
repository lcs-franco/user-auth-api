import { makeAuthenticationMiddleware } from '@factories/middlewares/makeAuthenticationMiddleware';
import { makeCreateRolePermissionController } from '@factories/role-permission/makeCreateRolePermissionController';
import { middlewareAdapter } from '@server/adapters/middlewareAdapter';
import { routeAdapter } from '@server/adapters/routeAdapter';
import { FastifyInstance } from 'fastify';

export function rolePermissionsRoutes(fastify: FastifyInstance) {
  fastify.addHook(
    'preHandler',
    middlewareAdapter(makeAuthenticationMiddleware())
  );

  fastify.post('/:id', routeAdapter(makeCreateRolePermissionController()));
}

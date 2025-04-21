import { makeSignInController } from '@factories/users/makeSignInController';
import { makeSignUpController } from '@factories/users/makeSignUpController';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';
import { makeChangeUserRoleController } from '@factories/users/makeChangeUserRoleController';
import { makeAuthenticationMiddleware } from '@factories/middlewares/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '@factories/middlewares/makeAuthorizationMiddleware';
import { middlewareAdapter } from '@server/adapters/middlewareAdapter';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/sign-up', routeAdapter(makeSignUpController()));
  fastify.post('/sign-in', routeAdapter(makeSignInController()));

  fastify.put(
    '/change-role/:id',
    {
      preHandler: [
        middlewareAdapter(makeAuthenticationMiddleware()),
        middlewareAdapter(makeAuthorizationMiddleware(['role:update'])),
      ],
    },
    routeAdapter(makeChangeUserRoleController())
  );
}

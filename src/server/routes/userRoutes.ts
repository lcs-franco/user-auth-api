import { makeAuthenticationMiddleware } from '@factories/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '@factories/makeAuthorizationMiddleware';
import { makeSignInController } from '@factories/makeSignInController';
import { makeSignUpController } from '@factories/makeSignUpController';
import { makeUpdateAccountController } from '@factories/makeUpdateUsersController';
import { middlewareAdapter } from '@server/adapters/middlewareAdapter';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';

export async function userRoutes(fasfity: FastifyInstance) {
  fasfity.post('/sign-up', routeAdapter(makeSignUpController()));
  fasfity.post('/sign-in', routeAdapter(makeSignInController()));

  fasfity.put(
    '/:id',
    {
      preHandler: [
        middlewareAdapter(makeAuthenticationMiddleware()),
        middlewareAdapter(makeAuthorizationMiddleware(['accounts:update'])),
      ],
    },
    routeAdapter(makeUpdateAccountController())
  );

  fasfity.post('/logout', () => {});
}

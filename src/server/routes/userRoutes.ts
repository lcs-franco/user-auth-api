import { makeSignInController } from '@factories/accounts/makeSignInController';
import { makeSignUpController } from '@factories/accounts/makeSignUpController';
import { makeUpdateAccountController } from '@factories/accounts/makeUpdateUsersController';
import { makeAuthenticationMiddleware } from '@factories/middlewares/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '@factories/middlewares/makeAuthorizationMiddleware';
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

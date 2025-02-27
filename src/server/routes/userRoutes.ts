import { makeSignInController } from '@factories/makeSignInController';
import { makeSignUpController } from '@factories/makeSignUpController';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';

export async function userRoutes(fasfity: FastifyInstance) {
  fasfity.post('/sign-up', routeAdapter(makeSignUpController()));
  fasfity.post('/sign-in', routeAdapter(makeSignInController()));

  fasfity.post('/logout', () => {});
}

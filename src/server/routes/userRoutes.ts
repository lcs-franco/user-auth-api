import { makeSignInController } from '@factories/accounts/makeSignInController';
import { makeSignUpController } from '@factories/accounts/makeSignUpController';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/sign-up', routeAdapter(makeSignUpController()));
  fastify.post('/sign-in', routeAdapter(makeSignInController()));

  fastify.post('/logout', () => {});
}

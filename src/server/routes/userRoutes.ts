import { makeSignInController } from '@factories/users/makeSignInController';
import { makeSignUpController } from '@factories/users/makeSignUpController';
import { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/sign-up', routeAdapter(makeSignUpController()));
  fastify.post('/sign-in', routeAdapter(makeSignInController()));
}

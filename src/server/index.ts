import Fastify from 'fastify';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '../factories/makeAuthorizationMiddleware';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { userRoutes } from './routes/userRoutes';

const fastify = Fastify();

fastify.register(userRoutes, { prefix: 'users' });

fastify.post(
  '/create-users',
  {
    preHandler: [
      middlewareAdapter(makeAuthenticationMiddleware()),
      middlewareAdapter(makeAuthorizationMiddleware(['leads:write'])),
    ],
  },
  async (req, res) => res.send({ created: true })
);

export async function main() {
  try {
    fastify.listen({ port: 3001 }, () => {
      console.log('> server started at http://localhost:3001');
    });
  } catch (error) {
    console.log(error);
  }
}

main();

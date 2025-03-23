import { makeAuthenticationMiddleware } from '@factories/middlewares/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '@factories/middlewares/makeAuthorizationMiddleware';
import Fastify from 'fastify';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { permissionsRoutes } from './routes/permissionsRoutes';
import { rolesRoutes } from './routes/rolesRoutes';
import { userRoutes } from './routes/userRoutes';

const fastify = Fastify();

fastify.register(userRoutes, { prefix: 'users' });
fastify.register(rolesRoutes, { prefix: 'roles' });
fastify.register(permissionsRoutes, { prefix: 'permissions' });

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

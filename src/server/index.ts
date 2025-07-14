import Fastify from 'fastify';
import { permissionsRoutes } from './routes/permissionsRoutes';
import { rolePermissionsRoutes } from './routes/rolePermissiosRoutes';
import { rolesRoutes } from './routes/rolesRoutes';
import { userRoutes } from './routes/userRoutes';

const fastify = Fastify();

fastify.register(userRoutes, { prefix: 'users' });
fastify.register(rolesRoutes, { prefix: 'roles' });
fastify.register(permissionsRoutes, { prefix: 'permissions' });
fastify.register(rolePermissionsRoutes, { prefix: 'role-permissions' });

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

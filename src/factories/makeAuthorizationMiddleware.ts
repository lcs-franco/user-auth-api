import { AuthorizationMiddleware } from '../app/middlewares/AuthorizationMiddleware';
import { makeGetRolesPermissionsUseCase } from './makeGetRolesPermissionsUseCase';

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  return new AuthorizationMiddleware(
    requiredPermissions,
    makeGetRolesPermissionsUseCase()
  );
}

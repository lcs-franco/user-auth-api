import { CreatePermissionController } from '@app/controllers/permission/CreatePermissionController';
import { makeCreatePermissionUseCase } from './makeCreatePermissionUseCase';

export function makeCreatePermissionController() {
  const createPermissionUseCase = makeCreatePermissionUseCase();
  return new CreatePermissionController(createPermissionUseCase);
}

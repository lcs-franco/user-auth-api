
import { CreateRolePermissionController } from '@app/controllers/role-permission/CreateRolePermissionController';
import { makeCreateRolePermissionUseCase } from './makeCreateRolePermissionUseCase';

export function makeCreateRolePermissionController() {
  const createRolePermissionUseCase = makeCreateRolePermissionUseCase();
  return new CreateRolePermissionController(createRolePermissionUseCase);
}


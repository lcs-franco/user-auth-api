
import { DeleteRolePermissionController } from '@app/controllers/role-permission/DeleteRolePermissionController';
import { makeDeleteRolePermissionUseCase } from './makeDeleteRolePermissionUseCase';

export function makeDeleteRolePermissionController() {
  const deleteRolePermissionUseCase = makeDeleteRolePermissionUseCase();
  return new DeleteRolePermissionController(deleteRolePermissionUseCase);
}


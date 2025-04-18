
import { DeleteRolePermissionUseCase } from '@app/useCases/role-permission/DeleteRolePermissionUseCase';

export function makeDeleteRolePermissionUseCase() {
  return new DeleteRolePermissionUseCase();
}


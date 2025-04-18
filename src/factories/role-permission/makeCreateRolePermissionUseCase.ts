
import { CreateRolePermissionUseCase } from '@app/useCases/role-permission/CreateRolePermissionUseCase';

export function makeCreateRolePermissionUseCase() {
  return new CreateRolePermissionUseCase();
}


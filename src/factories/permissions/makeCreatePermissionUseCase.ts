import { CreatePermissionUseCase } from '@app/useCases/permissions/CreatePermissionUseCase';

export function makeCreatePermissionUseCase() {
  return new CreatePermissionUseCase();
}

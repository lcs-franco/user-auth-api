
import { UpdatePermissionUseCase } from '@app/useCases/permissions/UpdatePermissionUseCase';

export function makeUpdatePermissionUseCase() {
  return new UpdatePermissionUseCase();
}


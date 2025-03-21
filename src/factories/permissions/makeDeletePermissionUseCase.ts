
import { DeletePermissionUseCase } from '@app/useCases/permissions/DeletePermissionUseCase';

export function makeDeletePermissionUseCase() {
  return new DeletePermissionUseCase();
}



import { DeletePermissionController } from '@app/controllers/permissions/DeletePermissionController';
import { makeDeletePermissionUseCase } from './makeDeletePermissionUseCase';

export function makeDeletePermissionController() {
  const deletePermissionUseCase = makeDeletePermissionUseCase();
  return new DeletePermissionController(deletePermissionUseCase);
}


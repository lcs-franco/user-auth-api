
import { UpdatePermissionController } from '@app/controllers/permissions/UpdatePermissionController';
import { makeUpdatePermissionUseCase } from './makeUpdatePermissionUseCase';

export function makeUpdatePermissionController() {
  const updatePermissionUseCase = makeUpdatePermissionUseCase();
  return new UpdatePermissionController(updatePermissionUseCase);
}


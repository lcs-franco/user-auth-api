import { ListPermissionController } from '@app/controllers/permissions/ListPermissionController';
import { makeListPermissionUseCase } from './makeListPermissionUseCase';

export function makeListPermissionController() {
  const listPermissionUseCase = makeListPermissionUseCase();
  return new ListPermissionController(listPermissionUseCase);
}


import { RemoveFromRolesController } from '@app/controllers/permissions/RemoveFromRolesController';
import { makeRemoveFromRolesUseCase } from './makeRemoveFromRolesUseCase';

export function makeRemoveFromRolesController() {
  const removeFromRolesUseCase = makeRemoveFromRolesUseCase();
  return new RemoveFromRolesController(removeFromRolesUseCase);
}



import { UpdateRoleController } from '@app/controllers/roles/UpdateRoleController';
import { makeUpdateRoleUseCase } from './makeUpdateRoleUseCase';

export function makeUpdateRoleController() {
  const updateRoleUseCase = makeUpdateRoleUseCase();
  return new UpdateRoleController(updateRoleUseCase);
}


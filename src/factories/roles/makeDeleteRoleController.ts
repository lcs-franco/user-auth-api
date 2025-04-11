
import { DeleteRoleController } from '@app/controllers/roles/DeleteRoleController';
import { makeDeleteRoleUseCase } from './makeDeleteRoleUseCase';

export function makeDeleteRoleController() {
  const deleteRoleUseCase = makeDeleteRoleUseCase();
  return new DeleteRoleController(deleteRoleUseCase);
}


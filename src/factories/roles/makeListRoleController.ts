
import { ListRoleController } from '@app/controllers/roles/ListRoleController';
import { makeListRoleUseCase } from './makeListRoleUseCase';

export function makeListRoleController() {
  const listRoleUseCase = makeListRoleUseCase();
  return new ListRoleController(listRoleUseCase);
}


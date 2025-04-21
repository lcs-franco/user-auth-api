
import { ChangeUserRoleController } from '@app/controllers/users/ChangeUserRoleController';
import { makeChangeUserRoleUseCase } from './makeChangeUserRoleUseCase';

export function makeChangeUserRoleController() {
  const changeUserRoleUseCase = makeChangeUserRoleUseCase();
  return new ChangeUserRoleController(changeUserRoleUseCase);
}


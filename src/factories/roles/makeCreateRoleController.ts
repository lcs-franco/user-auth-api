import { CreateRoleController } from '@app/controllers/roles/CreateRoleController';
import { makeCreateRoleUseCase } from './makeCreateRoleUseCase';

export function makeCreateRoleController() {
  const createRoleUseCase = makeCreateRoleUseCase();
  return new CreateRoleController(createRoleUseCase);
}

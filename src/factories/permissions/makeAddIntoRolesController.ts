
import { AddIntoRolesController } from '@app/controllers/permissions/AddIntoRolesController';
import { makeAddIntoRolesUseCase } from './makeAddIntoRolesUseCase';

export function makeAddIntoRolesController() {
  const addIntoRolesUseCase = makeAddIntoRolesUseCase();
  return new AddIntoRolesController(addIntoRolesUseCase);
}


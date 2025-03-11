import { CreateRoleUseCase } from '@app/useCases/roles/CreateRoleUseCase';

export function makeCreateRoleUseCase() {
  return new CreateRoleUseCase();
}

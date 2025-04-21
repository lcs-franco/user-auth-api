
import { ChangeUserRoleUseCase } from '@app/useCases/users/ChangeUserRoleUseCase';

export function makeChangeUserRoleUseCase() {
  return new ChangeUserRoleUseCase();
}



import { DeleteRoleUseCase } from '@app/useCases/roles/DeleteRoleUseCase';

export function makeDeleteRoleUseCase() {
  return new DeleteRoleUseCase();
}


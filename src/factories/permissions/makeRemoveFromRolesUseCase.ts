
import { RemoveFromRolesUseCase } from '@app/useCases/permissions/RemoveFromRolesUseCase';

export function makeRemoveFromRolesUseCase() {
  return new RemoveFromRolesUseCase();
}


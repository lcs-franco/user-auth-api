import { ListPermissionUseCase } from '@app/useCases/permissions/ListPermissionUseCase';

export function makeListPermissionUseCase() {
  return new ListPermissionUseCase();
}

import { GetRolesPermissionsUseCase } from '@app/useCases/roles/GetRolesPermissionsUseCase';

export function makeGetRolesPermissionsUseCase() {
  return new GetRolesPermissionsUseCase();
}

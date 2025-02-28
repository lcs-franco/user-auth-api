import { GetRolesPermissionsUseCase } from '@app/useCases/GetRolesPermissionsUseCase';

export function makeGetRolesPermissionsUseCase() {
  return new GetRolesPermissionsUseCase();
}

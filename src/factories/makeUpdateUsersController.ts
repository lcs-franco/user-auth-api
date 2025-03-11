import { UpdateAccountController } from '@app/controllers/accounts/UpdateAccountController';
import { makeUpdateAccountUseCase } from './makeUpdateUsersUseCase';

export function makeUpdateAccountController() {
  const updateAccountUseCase = makeUpdateAccountUseCase();
  return new UpdateAccountController(updateAccountUseCase);
}

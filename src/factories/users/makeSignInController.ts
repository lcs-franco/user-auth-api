import { SignInContoller } from '@app/controllers/users/SignInController';
import { makeSignInUseCase } from './makeSignInUseCase';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();
  return new SignInContoller(signInUseCase);
}

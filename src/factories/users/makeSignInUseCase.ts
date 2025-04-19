import { SignInUseCase } from '@app/useCases/users/SignInUseCase';

export function makeSignInUseCase() {
  return new SignInUseCase();
}

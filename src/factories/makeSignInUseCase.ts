import { SignInUseCase } from '@app/useCases/accounts/SignInUseCase';

export function makeSignInUseCase() {
  return new SignInUseCase();
}

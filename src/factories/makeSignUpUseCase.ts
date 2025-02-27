import { SignUpUseCase } from '@app/useCases/accounts/SignUpUseCase';

export function makeSignUpUseCase() {
  const SALT = 10;
  return new SignUpUseCase(SALT);
}

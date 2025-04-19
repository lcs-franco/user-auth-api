import { SignUpUseCase } from '@app/useCases/users/SignUpUseCase';

export function makeSignUpUseCase() {
  const SALT = 10;
  return new SignUpUseCase(SALT);
}

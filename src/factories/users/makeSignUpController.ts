import { SignUpController } from '@app/controllers/users/SignUpController';
import { makeSignUpUseCase } from './makeSignUpUseCase';

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();
  return new SignUpController(signUpUseCase);
}

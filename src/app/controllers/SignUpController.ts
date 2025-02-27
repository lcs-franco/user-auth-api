import { z, ZodError } from 'zod';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { SignUpUseCase } from '../useCases/accounts/SignUpUseCase';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(2),
  password: z.string().min(8),
  roleId: z.string().uuid(),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password, roleId } = schema.parse(body);

      await this.signUpUseCase.execute({ email, name, password, roleId });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues, //* mapamento de issues e mensagens mais condizentes
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409, //Conflict
          body: {
            error: 'This email is already in use',
          },
        };
      }

      throw error;
    }
  }
}

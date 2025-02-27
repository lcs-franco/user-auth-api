import { UpdateAccountUseCase } from '@app/useCases/accounts/UpdateAccountUseCase';
import { z, ZodError } from 'zod';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';

const schema = z.object({
  email: z.string().email().min(2),
  name: z.string().min(2),
});

export class UpdateAccountController implements IController {
  constructor(private readonly updateAccountUseCase: UpdateAccountUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name } = schema.parse(body);

      await this.updateAccountUseCase.execute({
        email,
        name,
      });

      return {
        statusCode: 200,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues, //* mapamento de issues e mensagens mais condizentes
        };
      }
      throw error;
    }
  }
}

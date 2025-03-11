import { AccountAlreadyExists } from '@app/errors/AccountAlreadyExists';
import { UpdateAccountUseCase } from '@app/useCases/accounts/UpdateAccountUseCase';
import { z, ZodError } from 'zod';
import { IController, IResponse } from '../../interfaces/IController';
import { IRequest } from '../../interfaces/IRequest';

const schema = z.object({
  email: z.string().email().min(2).optional(),
  name: z.string().min(2).optional(),
});

export class UpdateAccountController implements IController {
  constructor(private readonly updateAccountUseCase: UpdateAccountUseCase) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    try {
      const { email, name } = schema.parse(body);

      const result = await this.updateAccountUseCase.execute({
        email,
        name,
        id: params.id,
      });

      return {
        statusCode: 200,
        body: result,
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

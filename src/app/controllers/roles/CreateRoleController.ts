import { RoleAlreadyExists } from '@app/errors/RoleAlreadyExists';
import { CreateRoleUseCase } from '@app/useCases/roles/CreateRoleUseCase';
import { z, ZodError } from 'zod';
import { IController, IResponse } from '../../interfaces/IController';
import { IRequest } from '../../interfaces/IRequest';

const schema = z.object({
  name: z.string().min(2),
});

export class CreateRoleController implements IController {
  constructor(private readonly createRoleUseCase: CreateRoleUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name } = schema.parse(body);

      await this.createRoleUseCase.execute({ name });

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

      if (error instanceof RoleAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'This role already exists',
          },
        };
      }

      throw error;
    }
  }
}

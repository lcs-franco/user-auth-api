import { CodeFormat } from '@app/errors/CodeFormat';
import { PermissionAlreadyExists } from '@app/errors/PermissionAlreadyExists';
import { CreatePermissionUseCase } from '@app/useCases/permissions/CreatePermissionUseCase';
import { z, ZodError } from 'zod';
import { IController, IResponse } from '../../interfaces/IController';
import { IRequest } from '../../interfaces/IRequest';

const schema = z.object({
  name: z.string().min(2),
  code: z.string(),
});

export class CreatePermissionController implements IController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase
  ) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, code } = schema.parse(body);

      const permission = await this.createPermissionUseCase.execute({
        name,
        code,
      });

      return {
        statusCode: 200,
        body: permission,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues, //* mapamento de issues e mensagens mais condizentes
        };
      }

      if (error instanceof PermissionAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'This permission already exists',
          },
        };
      }

      if (error instanceof CodeFormat) {
        return {
          statusCode: 406,
          body: {
            error: 'Code must be in "your:code" format',
          },
        };
      }

      throw error;
    }
  }
}

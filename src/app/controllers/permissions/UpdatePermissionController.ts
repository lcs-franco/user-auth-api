import { PermissionAlreadyExists } from '@app/errors/PermissionAlreadyExists';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { UpdatePermissionUseCase } from '@app/useCases/permissions/UpdatePermissionUseCase';
import { z, ZodError } from 'zod';

const schema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
});

export class UpdatePermissionController implements IController {
  constructor(
    private readonly updatePermissionUseCase: UpdatePermissionUseCase
  ) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    try {
      const { name, code } = schema.parse(body);

      const result = await this.updatePermissionUseCase.execute({
        id: params.id,
        name,
        code,
      });

      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
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

      throw error;
    }
  }
}

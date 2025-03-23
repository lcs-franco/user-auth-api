import { NotFound } from '@app/errors/NotFound';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { RemoveFromRolesUseCase } from '@app/useCases/permissions/RemoveFromRolesUseCase';
import { z, ZodError } from 'zod';

const schema = z.object({
  permissionCode: z.string(),
  roleId: z.string(),
});

export class RemoveFromRolesController implements IController {
  constructor(
    private readonly removeFromRolesUseCase: RemoveFromRolesUseCase
  ) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { permissionCode, roleId } = schema.parse(body);

      await this.removeFromRolesUseCase.execute({
        permissionCode,
        roleId,
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof NotFound) {
        return {
          statusCode: 404,
          body: {
            error: 'Role or permission not found',
          },
        };
      }

      throw error;
    }
  }
}

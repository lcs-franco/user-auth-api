import { z, ZodError } from 'zod';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { DeleteRolePermissionUseCase } from '@app/useCases/role-permission/DeleteRolePermissionUseCase';
import { NotFound } from '@app/errors/NotFound';

const schema = z.object({
  permissionCode: z.string(),
});

export class DeleteRolePermissionController implements IController {
  constructor(
    private readonly deleteRolePermissionUseCase: DeleteRolePermissionUseCase
  ) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    try {
      const { permissionCode } = schema.parse(body);

      await this.deleteRolePermissionUseCase.execute({
        permissionCode,
        roleId: params.id,
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

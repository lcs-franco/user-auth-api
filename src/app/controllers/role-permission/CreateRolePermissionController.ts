import { z, ZodError } from 'zod';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { CreateRolePermissionUseCase } from '@app/useCases/role-permission/CreateRolePermissionUseCase';
import { RolePermission } from '@app/errors/RolePermission';
import { NotFound } from '@app/errors/NotFound';

const schema = z.object({
  permissionCode: z.string(),
});

export class CreateRolePermissionController implements IController {
  constructor(
    private readonly createRolePermissionUseCase: CreateRolePermissionUseCase
  ) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    try {
      const { permissionCode } = schema.parse(body);

      await this.createRolePermissionUseCase.execute({
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

      if (error instanceof RolePermission) {
        return {
          statusCode: 409,
          body: {
            error: 'This role already have this permission',
          },
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

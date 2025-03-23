import { NotFound } from '@app/errors/NotFound';
import { RolePermission } from '@app/errors/RolePermission';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { AddIntoRolesUseCase } from '@app/useCases/permissions/AddIntoRolesUseCase';
import { z, ZodError } from 'zod';

const schema = z.object({
  permissionCode: z.string(),
  roleId: z.string(),
});

export class AddIntoRolesController implements IController {
  constructor(private readonly addIntoRolesUseCase: AddIntoRolesUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { permissionCode, roleId } = schema.parse(body);

      await this.addIntoRolesUseCase.execute({
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

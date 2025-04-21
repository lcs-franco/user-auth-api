import { z, ZodError } from 'zod';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { ChangeUserRoleUseCase } from '@app/useCases/users/ChangeUserRoleUseCase';
import { NotFound } from '@app/errors/NotFound';
import { RoleAlreadyExists } from '@app/errors/RoleAlreadyExists';

const schema = z.object({
  roleId: z.string(),
});

export class ChangeUserRoleController implements IController {
  constructor(private readonly changeUserRoleUseCase: ChangeUserRoleUseCase) {}

  async handle({ body, params }: IRequest): Promise<IResponse> {
    try {
      const { roleId } = schema.parse(body);

      await this.changeUserRoleUseCase.execute({
        userId: params.id,
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
            error: 'User not found',
          },
        };
      }

      if (error instanceof RoleAlreadyExists) {
        return {
          statusCode: 404,
          body: {
            error: 'This user already have this role',
          },
        };
      }

      throw error;
    }
  }
}

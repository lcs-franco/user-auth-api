import { RoleAlreadyExists } from '@app/errors/RoleAlreadyExists';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { UpdateRoleUseCase } from '@app/useCases/roles/UpdateRoleUseCase';
import { z, ZodError } from 'zod';

const schema = z.object({
  name: z.string().toUpperCase(),
});

export class UpdateRoleController implements IController {
  constructor(private readonly updateRoleUseCase: UpdateRoleUseCase) {}

  async handle({ params, body }: IRequest): Promise<IResponse> {
    try {
      const { name } = schema.parse(body);

      const result = await this.updateRoleUseCase.execute({
        id: params.id,
        name,
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

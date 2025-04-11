import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { DeleteRoleUseCase } from '@app/useCases/roles/DeleteRoleUseCase';
import { ZodError } from 'zod';

export class DeleteRoleController implements IController {
  constructor(private readonly deleteRoleUseCase: DeleteRoleUseCase) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      await this.deleteRoleUseCase.execute({ id: params.id });

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

      throw error;
    }
  }
}

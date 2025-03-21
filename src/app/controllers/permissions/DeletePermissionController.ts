import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { DeletePermissionUseCase } from '@app/useCases/permissions/DeletePermissionUseCase';
import { ZodError } from 'zod';

export class DeletePermissionController implements IController {
  constructor(
    private readonly deletePermissionUseCase: DeletePermissionUseCase
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      await this.deletePermissionUseCase.execute({ id: params.id });

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

import { ListPermissionUseCase } from '@app/useCases/permissions/ListPermissionUseCase';
import { z, ZodError } from 'zod';
import { IController, IResponse } from '../../interfaces/IController';
import { IRequest } from '../../interfaces/IRequest';

const schema = z.object({
  filter: z.string().optional(),
});

export class ListPermissionController implements IController {
  constructor(private readonly listPermissionUseCase: ListPermissionUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { filter } = schema.parse(body); //! change to query

      const permissions = await this.listPermissionUseCase.execute({
        filter,
      });

      return {
        statusCode: 200,
        body: permissions,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues, //* mapamento de issues e mensagens mais condizentes
        };
      }

      throw error;
    }
  }
}

import { z, ZodError } from 'zod';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { ListRoleUseCase } from '@app/useCases/roles/ListRoleUseCase';

const schema = z.object({
  filter: z.string().optional(),
});

export class ListRoleController implements IController {
  constructor(private readonly listRoleUseCase: ListRoleUseCase) {}

  async handle({ query }: IRequest): Promise<IResponse> {
    try {
      const { filter } = schema.parse(query);

      const result = await this.listRoleUseCase.execute({ filter });

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

      throw error;
    }
  }
}

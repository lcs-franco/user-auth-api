import { ZodError } from "zod";
import { IController, IResponse } from "../interfaces/IController";
import { ListUsersUseCase } from "../useCases/ListUsersUseCase";

export class ListUsersController implements IController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  async handle(): Promise<IResponse> {
    try {
      const users = await this.listUsersUseCase.execute();

      return {
        statusCode: 200,
        body: { users },
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

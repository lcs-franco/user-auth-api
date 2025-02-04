import { prismaClient } from "../lib/prismaClient";

interface IOutput {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class ListUsersUseCase {
  async execute(): Promise<IOutput[]> {
    const users = await prismaClient.account.findMany();

    return users;
  }
}

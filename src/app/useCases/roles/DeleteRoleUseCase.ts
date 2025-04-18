import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  id: string;
}

type IOutput = void;

export class DeleteRoleUseCase {
  async execute({ id }: IInput): Promise<IOutput> {
    await prismaClient.role.delete({
      where: { id },
    });

    return;
  }
}

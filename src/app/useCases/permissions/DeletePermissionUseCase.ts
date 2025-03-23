import { prismaClient } from '@app/lib/prismaClient';

export interface IInput {
  id: string;
}

type IOutput = void;

export class DeletePermissionUseCase {
  async execute({ id }: IInput): Promise<IOutput> {
    await prismaClient.permission.delete({
      where: { id },
    });

    return;
  }
}

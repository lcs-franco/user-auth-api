import { PermissionAlreadyExists } from '@app/errors/PermissionAlreadyExists';
import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  id: string;
  name?: string;
  code?: string;
}

interface IOutput {
  id: string;
  name: string;
  code: string;
}

export class UpdatePermissionUseCase {
  async execute({ id, name, code }: IInput): Promise<IOutput> {
    if (code) {
      const findCodeAlreadyInUse = await prismaClient.permission.findUnique({
        where: { code: code },
      });

      if (findCodeAlreadyInUse) throw new PermissionAlreadyExists();
    }

    const permission = await prismaClient.permission.update({
      where: { id },
      data: { name, code },
    });

    return permission;
  }
}

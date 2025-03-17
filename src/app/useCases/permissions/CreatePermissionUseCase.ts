import { CodeFormat } from '@app/errors/CodeFormat';
import { PermissionAlreadyExists } from '@app/errors/PermissionAlreadyExists';
import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  name: string;
  code: string;
}

interface IOutput {
  id: string;
  name: string;
  code: string;
}

export class CreatePermissionUseCase {
  async execute({ name, code }: IInput): Promise<IOutput> {
    const codeSplited = code.split(':');

    if (codeSplited.length < 2) throw new CodeFormat();

    const findCodeAlreadyInUse = await prismaClient.permission.findUnique({
      where: {
        code,
      },
    });

    if (findCodeAlreadyInUse) throw new PermissionAlreadyExists();

    const permission = await prismaClient.permission.create({
      data: {
        name,
        code,
      },
    });

    return permission;
  }
}

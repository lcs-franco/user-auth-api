import { RoleAlreadyExists } from '@app/errors/RoleAlreadyExists';
import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  id: string;
  name: string;
}

interface IOutput {
  id: string;
  name: string;
}

export class UpdateRoleUseCase {
  async execute({ id, name }: IInput): Promise<IOutput> {
    const findNameAlreadyInUse = await prismaClient.role.findUnique({
      where: { name },
    });
    if (findNameAlreadyInUse) throw new RoleAlreadyExists();

    const role = await prismaClient.role.update({
      where: { id },
      data: { name },
    });

    return role;
  }
}

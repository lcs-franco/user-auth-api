import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  filter?: string;
}

interface IOutput {
  id: string;
  name: string;
  permissions: {
    roleId: string;
    permissionCode: string;
  }[];
}

export class ListRoleUseCase {
  async execute({ filter }: IInput): Promise<IOutput[]> {
    const roles = await prismaClient.role.findMany({
      where: { name: { contains: filter } },
      select: { id: true, name: true, permissions: true },
    });

    return roles;
  }
}

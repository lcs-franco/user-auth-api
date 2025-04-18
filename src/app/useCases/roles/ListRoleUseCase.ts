import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  filter?: string;
}

interface IOutput {
  id: string;
  name: string;
  rolePermissions: {
    roleId: string;
    permissionCode: string;
  }[];
}

export class ListRoleUseCase {
  async execute({ filter }: IInput): Promise<IOutput[]> {
    const roles = await prismaClient.role.findMany({
      where: { name: { contains: filter } },
      include: { rolePermissions: true },
    });

    return roles;
  }
}

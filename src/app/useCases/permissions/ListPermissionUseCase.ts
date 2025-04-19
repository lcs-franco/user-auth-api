import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  filter?: string;
}

interface IOutput {
  id: string;
  name: string;
  code: string;
  rolePermissions: {
    role: {
      id: string;
      name: string;
    };
  }[];
}

export class ListPermissionUseCase {
  async execute({ filter }: IInput): Promise<IOutput[]> {
    const permissions = await prismaClient.permission.findMany({
      where: { code: { contains: filter } },
      include: {
        rolePermissions: {
          omit: { permissionCode: true, roleId: true },
          include: { role: true },
        },
      },
    });

    return permissions;
  }
}

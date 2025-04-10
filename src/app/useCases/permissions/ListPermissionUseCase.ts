import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  filter?: string;
}

interface IOutput {
  id: string;
  name: string;
  code: string;
  roles: {
    roleId: string;
    permissionCode: string;
  }[];
}

export class ListPermissionUseCase {
  async execute({ filter }: IInput): Promise<IOutput[]> {
    const permissions = await prismaClient.permission.findMany({
      where: { code: { contains: filter } },
      select: { id: true, name: true, code: true, roles: true },
    });

    return permissions;
  }
}

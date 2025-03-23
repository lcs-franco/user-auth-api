import { NotFound } from '@app/errors/NotFound';
import { RolePermission } from '@app/errors/RolePermission';
import { prismaClient } from '@app/lib/prismaClient';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface IInput {
  permissionCode: string;
  roleId: string;
}

type IOutput = void;

export class AddIntoRolesUseCase {
  async execute({ permissionCode, roleId }: IInput): Promise<IOutput> {
    try {
      await prismaClient.rolePermission.create({
        data: { permissionCode, roleId },
        select: {
          permission: { select: { name: true, code: true, roles: true } },
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new RolePermission();
        }
        if (e.code === 'P2003') {
          throw new NotFound();
        }
      }

      throw e;
    }
  }
}

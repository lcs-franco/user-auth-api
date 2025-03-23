import { NotFound } from '@app/errors/NotFound';
import { prismaClient } from '@app/lib/prismaClient';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface IInput {
  permissionCode: string;
  roleId: string;
}

type IOutput = void;

export class RemoveFromRolesUseCase {
  async execute({ permissionCode, roleId }: IInput): Promise<IOutput> {
    try {
      await prismaClient.rolePermission.delete({
        where: { roleId_permissionCode: { permissionCode, roleId } },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFound();
        }
      }

      throw e;
    }
  }
}

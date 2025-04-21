import { NotFound } from '@app/errors/NotFound';
import { RoleAlreadyExists } from '@app/errors/RoleAlreadyExists';
import { prismaClient } from '@app/lib/prismaClient';

interface IInput {
  userId: string;
  roleId: string;
}

type IOutput = void;

export class ChangeUserRoleUseCase {
  async execute({ userId, roleId }: IInput): Promise<IOutput> {
    const user = await prismaClient.account.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFound();
    if (user.roleId === roleId) throw new RoleAlreadyExists();

    await prismaClient.account.update({
      data: { roleId },
      where: { id: user.id },
    });
  }
}

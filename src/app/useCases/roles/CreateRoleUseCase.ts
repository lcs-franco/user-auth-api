import { RoleAlreadyExists } from '@app/errors/RoleAlreadyExists';
import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  name: string;
}

type IOutput = void;

export class CreateRoleUseCase {
  async execute({ name }: IInput): Promise<IOutput> {
    const formatedName = name.toUpperCase();

    const findNameAlreadyInUse = await prismaClient.role.findUnique({
      where: {
        name: formatedName,
      },
    });

    if (findNameAlreadyInUse) throw new RoleAlreadyExists();

    await prismaClient.role.create({
      data: {
        name: formatedName,
      },
    });
  }
}

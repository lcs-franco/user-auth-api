import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  email: string;
  name: string;
  id: string;
  roleId: string;
}

interface IOutput {
  email: string;
  name: string;
}

export class UpdateAccountUseCase {
  async execute({ email, name }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    await prismaClient.account.update({
      data: { name, email },
      where: { id: account?.id },
    });
  }
}

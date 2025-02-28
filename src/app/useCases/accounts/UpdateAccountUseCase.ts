import { AccountAlreadyExists } from '@app/errors/AccountAlreadyExists';
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
  async execute({ email, name, id, roleId }: IInput): Promise<IOutput> {
    const emailAlreadyInUse = await prismaClient.account.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) throw new AccountAlreadyExists();

    const updatedAccount = await prismaClient.account.update({
      data: { name, email },
      where: { id: account?.id },
    });
  }
}

import { AccountAlreadyExists } from '@app/errors/AccountAlreadyExists';
import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  email?: string;
  name?: string;
  id: string;
}

interface IOutput {
  email: string;
  name: string;
}

export class UpdateAccountUseCase {
  async execute({ email, name, id }: IInput): Promise<IOutput> {
    if (email) {
      const emailAlreadyInUse = await prismaClient.account.findUnique({
        where: { email, NOT: { id } },
      });

      if (emailAlreadyInUse) throw new AccountAlreadyExists();
    }

    const updatedAccount = await prismaClient.account.update({
      data: { name, email },
      where: { id },
      select: { name: true, email: true },
    });

    return updatedAccount;
  }
}

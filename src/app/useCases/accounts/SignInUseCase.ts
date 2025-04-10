import { generateAccessToken } from '@app/utils/generateAccessToken';
import { compare } from 'bcryptjs';
import { InvalidCredentials } from '../../errors/InvalidCredentials';
import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    const isPasswordValid =
      account && (await compare(password, account.password));

    if (!isPasswordValid || !account) throw new InvalidCredentials();

    const accessToken = generateAccessToken({
      accountId: account.id,
      roleId: account.roleId,
    });

    return { accessToken };
  }
}

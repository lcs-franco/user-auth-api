import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '../../config/env';
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

    const accessToken = sign(
      { sub: account.id, role: account.roleId },
      env.jwtSecret,
      {
        expiresIn: '15d',
      }
    );

    return { accessToken };
  }
}

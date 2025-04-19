import { generateAccessToken } from '@app/utils/generateAccessToken';
import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../../errors/AccountAlreadyExists';
import { prismaClient } from '../../lib/prismaClient';

interface IInput {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

interface IOutput {
  accessToken: string;
}

export class SignUpUseCase {
  constructor(private readonly salt: number) {}

  async execute({ email, name, password, roleId }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    });

    if (accountAlreadyExists) throw new AccountAlreadyExists();

    const hashedPassword = await hash(password, this.salt);

    const account = await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword,
        roleId,
      },
    });

    const accessToken = generateAccessToken({
      accountId: account.id,
      roleId: account.roleId,
    });

    return { accessToken };
  }
}

import { env } from '@app/config/env';
import { sign } from 'jsonwebtoken';

interface IInput {
  accountId: string;
  roleId: string;
}

export function generateAccessToken({ accountId, roleId }: IInput) {
  return sign({ sub: accountId, roleId }, env.jwtSecret, {
    expiresIn: '15d',
  });
}

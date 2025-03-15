import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from '../config/env';
import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import { IRequest } from '../interfaces/IRequest';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }

    try {
      const [type, token] = authorization.split(' ');
      if (type !== 'Bearer') throw new Error();

      const { sub: id, roleId } = verify(token, env.jwtSecret) as JwtPayload;

      return {
        data: {
          account: {
            id,
            roleId,
          },
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }
  }
}

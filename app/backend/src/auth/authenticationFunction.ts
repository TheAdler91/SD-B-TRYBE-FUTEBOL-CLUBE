import { SignOptions, sign, verify } from 'jsonwebtoken';
import { IPayload } from '../interfaces';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (user: IPayload) => sign({ user }, JWT_SECRET, jwtConfig);

const verifyToken = async (token: string) => {
  const payload = await verify(token, JWT_SECRET);
  return payload;
};

const TokenJWT = { createToken, verifyToken };
export default TokenJWT;

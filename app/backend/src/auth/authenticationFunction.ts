import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IPayload } from '../services/interfaces/userLogin';

dotenv.config();

export default class Token {
  private _jwt = jwt;
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'jwtsecret';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '7d',
    };
  }

  createToken(payload:IPayload): string {
    const { username, email, role } = payload;
    const token = this._jwt.sign({ username, email, role }, this._secret, this._options);
    return token;
  }

  verifyToken(token: string) {
    const verify = this._jwt.verify(token, this._secret);
    return verify;
  }
}

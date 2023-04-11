import { Request } from 'express';

export interface IRequest extends Request {
  user?: IPayload
}
export interface IPayload {
  id: number,
  username: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

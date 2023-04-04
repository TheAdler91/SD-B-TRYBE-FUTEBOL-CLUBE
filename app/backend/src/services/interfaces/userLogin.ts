export interface IUserLogin {
  email: string;
  password: string;
}

export interface IPayload {
  username: string;
  email: string;
  role: string;
}

export interface IUser extends IUserLogin, IPayload{
  id: number;
}

export default interface IUserService {
  findLogin (email: string): Promise<IUser | void>
}

import { ModelStatic } from 'sequelize';
import IUserService, { IUser } from './interfaces/userLogin';
import Users from '../database/models/UserModel';

export default class UserService implements IUserService {
  constructor(private userModel:ModelStatic<Users>) {}

  async findLogin(email: string): Promise<IUser> {
    const login = await this.userModel.findOne({
      where: { email },
    });
    return login as IUser;
  }
}

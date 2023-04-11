import { ModelStatic } from 'sequelize';
import { compare } from 'bcryptjs';
import Users from '../database/models/UserModel';
import TokenJWT from '../auth/authenticationFunction';
import { IPayload } from '../interfaces';

export default class UserService {
  constructor(private _userModel:ModelStatic<Users>) { }

  public async findLogin(email: string, password: string) {
    const user = await this._userModel.findOne({
      where: { email },
    });

    if (!user) return { status: 401, message: 'Invalid email or password' };

    const passVerify = await compare(password, user.password);

    if (!passVerify) return { status: 401, message: 'Invalid email or password' };

    const userValues = user.get({ plain: true });
    const token = TokenJWT.createToken(userValues);

    return { status: 200, message: token };
  }

  public async getRole(data: IPayload) {
    const { username } = data;

    const user = await this._userModel.findOne({ where: { username } });

    if (!user) return { status: 400, message: 'User not found' };

    const userValues = user.get({ plain: true });

    return userValues.role;
  }
}

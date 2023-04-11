import { ModelStatic } from 'sequelize';
import { compare } from 'bcryptjs';
import Users from '../database/models/UserModel';
import TokenJWT from '../auth/authenticationFunction';

export default class UserService {
  constructor(private userModel:ModelStatic<Users>) { }

  async findLogin(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) return { status: 401, message: 'Invalid email or password' };

    const passVerify = await compare(password, user.password);

    if (!passVerify) return { status: 401, message: 'Invalid email or password' };

    const userValues = user.get({ plain: true });
    const token = TokenJWT.createToken(userValues);

    return { status: 200, message: token };
  }
}

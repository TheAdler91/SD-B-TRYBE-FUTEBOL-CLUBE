import { compareSync } from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import IUserController from './interfaces/userControllerInterface';
import IUserService from '../services/userService';
import Token from '../auth/authenticationFunction';
import UnauthorizedError from '../error/UnauthorizedError';

export default class UserController implements IUserController {
  private _userService: IUserService;
  private _token: Token;

  constructor(userController: IUserService) {
    this._userService = userController;
    this._token = new Token();
  }

  async findLogin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const result = await this._userService.findLogin(email);
      if (!result || !compareSync(password, result.password)) {
        throw new UnauthorizedError('Invalid email or password');
      }
      const token = this._token.createToken(result);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

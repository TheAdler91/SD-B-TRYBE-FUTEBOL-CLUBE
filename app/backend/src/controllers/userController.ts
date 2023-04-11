import { Request, Response, NextFunction } from 'express';
// import IUserController from './interfaces/userControllerInterface';
import IUserService from '../services/userService';

export default class UserController {
  private _userService: IUserService;

  constructor(userController: IUserService) {
    this._userService = userController;
  }

  async findLogin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const { status, message } = await this._userService.findLogin(email, password);
      if (status !== 200) return res.status(status).json({ message });
      res.status(200).json({ token: message });
    } catch (error) {
      next(error);
    }
  }
}

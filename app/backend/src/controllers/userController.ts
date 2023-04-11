import { Request, Response, NextFunction } from 'express';
import IUserService from '../services/userService';

export default class UserController {
  private _userService: IUserService;

  constructor(userController: IUserService) {
    this._userService = userController;
  }

  public async findLogin(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const { status, message } = await this._userService.findLogin(email, password);
      if (status !== 200) return res.status(status).json({ message });
      res.status(200).json({ token: message });
    } catch (error) {
      next(error);
    }
  }

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { payload } = req.body;

      const { user } = payload;

      const role = await this._userService.getRole(user);
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}

// public getRole = async (req: IRequest, res: Response, next: NextFunction) => {
//   try {
//     const { id, role, username } = req.user as IPayload;

//     const userRole = await this._userService.getRole({ id, role, username });
//     res.status(200).json({ userRole });
//   } catch (error) {
//     next(error);
//   }
// };

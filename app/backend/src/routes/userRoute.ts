import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import UserService from '../services/userService';
import UserModel from '../database/models/UserModel';
import verifyRequiredFields from '../middlewares/field-check';

const router = Router();

const usersService = new UserService(UserModel);
const usersController = new UserController(usersService);

router.post('/', verifyRequiredFields('login'), (req: Request, res: Response, next: NextFunction) =>
  usersController.findLogin(req, res, next));

export default router;

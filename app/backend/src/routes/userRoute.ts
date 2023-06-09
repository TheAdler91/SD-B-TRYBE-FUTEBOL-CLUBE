import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import UserService from '../services/userService';
import UserModel from '../database/models/UserModel';
import tokenToValidate from '../middlewares/auth-token';
import { verifyRequiredFields, validationFields } from '../middlewares/field-check';

const router = Router();

const usersService = new UserService(UserModel);
const usersController = new UserController(usersService);

router.get('/role', tokenToValidate, (req: Request, res: Response, next: NextFunction) =>
  usersController.getRole(req, res, next));

router.post(
  '/',
  verifyRequiredFields('login'),
  validationFields,
  (req: Request, res: Response, next: NextFunction) =>
    usersController.findLogin(req, res, next),
);

export default router;

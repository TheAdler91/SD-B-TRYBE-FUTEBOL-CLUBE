import { Request, Response, NextFunction } from 'express';
import InvalidParamError from '../error/InvalidParamError';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new InvalidParamError('All fields must be filled');
  }
  return next();
};

export default loginValidation;

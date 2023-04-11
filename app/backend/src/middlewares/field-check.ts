import { Request, Response, NextFunction } from 'express';

const requestRequiredFields = {
  // user: ['username', 'email', 'password', 'age'],
  login: ['email', 'password'],
};

const verifyRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }

    next();
  };

const validationFields = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (regex.test(body.email) === false) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (body.password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export { verifyRequiredFields, validationFields };

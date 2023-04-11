import { Request, Response, NextFunction } from 'express';
import { IPayload } from '../interfaces';
// import * as jwt from 'jsonwebtoken';
import TokenJWT from '../auth/authenticationFunction';
// import { IUserName } from '../services/interfaces/userLogin';

// const secret = 'jwt_secret';

const tokenToValidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = await TokenJWT.verifyToken(token as string) as IPayload;
    if (!payload) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.body.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenToValidate;

// const tokenToValidate = (req: IRequest, res: Response, next: NextFunction) => {
//     const { authorization } = req.headers;
//     if (!authorization || authorization === undefined) {
//       return res.status(401).json({ message: 'Token not found' });
//     }
//     try {
//       const decoded = TokenJWT.verifyToken(authorization as string);
//       req.user = decoded as IPayload;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Token must be a valid token' });
//     }
//   };

// const tokenToValidate = (req: Request, res: Response, next: NextFunction) => {
//     const { authorization: token } = req.headers;
//     if (!token) {
//       return res.status(401).json({ message: 'Token not found' });
//     }
//     const payload = TokenJWT.verifyToken(token as string) as IPayload;
//     if (!payload) {
//       return res.status(401).json({ message: 'Token must be a valid token' });
//     }
//     req.body.payload = payload;
//     next();
//   };

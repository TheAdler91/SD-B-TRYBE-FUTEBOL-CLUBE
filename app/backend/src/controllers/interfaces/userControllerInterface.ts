import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
  findLogin (req: Request, res: Response, next: NextFunction): Promise<Response | void>
}

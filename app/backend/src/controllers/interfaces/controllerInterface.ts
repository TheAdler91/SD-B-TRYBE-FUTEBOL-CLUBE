import { NextFunction, Request, Response } from 'express';

export default interface ITeamController {
  findAll (req: Request, res: Response, next: NextFunction): Promise<Response | void>
  findById (req: Request, res: Response, next: NextFunction): Promise<Response | void>
}

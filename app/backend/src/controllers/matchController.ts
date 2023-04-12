import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';
// import { IMatch } from '../interfaces';
// import UnauthorizedError from '../error/UnauthorizedError';
// import InvalidParamError from '../error/InvalidParamError';

export default class MatchController {
  constructor(private matchService: MatchService) {
    this.matchService = matchService;
  }

  public async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.matchService.getAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public async getinProgress(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const result = await this.matchService.getInProgress(inProgress as string);
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

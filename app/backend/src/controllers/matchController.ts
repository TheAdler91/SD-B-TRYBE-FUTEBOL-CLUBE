import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';
// import { IMatch } from '../interfaces';
// import UnauthorizedError from '../error/UnauthorizedError';
// import InvalidParamError from '../error/InvalidParamError';

export default class MatchController {
  constructor(private matchService: MatchService) {
    this.matchService = matchService;
  }

  public async getMatches(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const games = await this.matchService.getInProgress(inProgress as string);
        res.status(200).json(games);
      }
      const matches = await this.matchService.getAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public async closeMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      await this.matchService.closeMatch(Number(id));
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async updateMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updateGoals = req.body;
      const { id } = req.params;

      await this.matchService.updateMatch(Number(id), updateGoals);
      res.status(200).json({ message: 'Edited' });
    } catch (error) {
      next(error);
    }
  }
}

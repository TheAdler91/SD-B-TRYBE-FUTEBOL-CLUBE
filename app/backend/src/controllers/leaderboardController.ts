import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderoardBController {
  private _leaderboard: LeaderBoardService;

  constructor(leaderboard: LeaderBoardService) {
    this._leaderboard = leaderboard;
  }

  getAwayTeamTable = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._leaderboard.getAwayTeamTable();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getHomeTeamTable = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._leaderboard.getHomeTeamTable();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

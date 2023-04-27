import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderoardBController {
  private _leaderboard: LeaderBoardService;

  constructor(leaderboard: LeaderBoardService) {
    this._leaderboard = leaderboard;
  }

  getAllHome = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this._leaderboard.getHomeTeam();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

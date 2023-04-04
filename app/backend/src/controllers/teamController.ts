import { Request, Response, NextFunction } from 'express';
import ITeamController from './interfaces/teamControllerInterface';
import ITeamService from '../services/interfaces/teamInterface';

export default class TeamController implements ITeamController {
  private _teamService: ITeamService;

  constructor(teamController: ITeamService) {
    this._teamService = teamController;
  }

  async findAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const teams = await this._teamService.findAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const team = await this._teamService.findById(Number(id));
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}

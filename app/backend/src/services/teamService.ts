import { ModelStatic } from 'sequelize';
import ITeamService, { ITeams } from './interfaces/teamInterface';
import Teams from '../database/models/TeamModel';
import InvalidParamError from '../error/InvalidParamError';

export default class TeamsService implements ITeamService {
  constructor(private teamModel:ModelStatic<Teams>) {}

  async findAll(): Promise<ITeams[]> {
    const teams = await this.teamModel.findAll();
    return teams as ITeams[];
  }

  async findById(id: number): Promise<ITeams> {
    const team = await this.teamModel.findByPk(id);
    if (!team) throw new InvalidParamError('Team not found');
    return team as ITeams;
  }
}

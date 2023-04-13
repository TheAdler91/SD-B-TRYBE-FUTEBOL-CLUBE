import { ModelStatic } from 'sequelize';
import ITeamService, { ITeams } from './interfaces/teamInterface';
import Teams from '../database/models/TeamModel';
import { NotFoundError } from '../error';

export default class TeamsService implements ITeamService {
  constructor(private teamModel:ModelStatic<Teams>) {}

  async findAll(): Promise<ITeams[]> {
    const teams = await this.teamModel.findAll();
    return teams as ITeams[];
  }

  async findById(id: number): Promise<ITeams> {
    const team = await this.teamModel.findByPk(id);
    if (!team) throw new NotFoundError('There is no team with such id!');
    return team as ITeams;
  }
}

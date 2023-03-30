import { ModelStatic } from 'sequelize';
import ITeamService, { ITeams } from './interfaces/teamInterface';
import Teams from '../database/models/TeamModel';

export default class TeamsService implements ITeamService {
  constructor(private teamModel:ModelStatic<Teams>) {}

  async findAll(): Promise<ITeams[]> {
    const teams = await this.teamModel.findAll();
    return teams as ITeams[];
  }
}

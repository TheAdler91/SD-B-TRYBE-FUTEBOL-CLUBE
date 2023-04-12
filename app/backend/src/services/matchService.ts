import { ModelStatic } from 'sequelize';
import { IMatch } from '../interfaces';
import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel:ModelStatic<Matches>,
    private teamModel: ModelStatic<Teams>,
  ) {}

  async getAllMatches(): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      include: [
        {
          model: this.teamModel,
          as: 'awayTeam',
        },
        {
          model: this.teamModel,
          as: 'homeTeam',
        }],
    });
    return matches;
  }
}

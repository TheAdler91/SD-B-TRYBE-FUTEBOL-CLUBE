import { ModelStatic } from 'sequelize';
import { IMatch, IUpdate } from '../interfaces';
import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel:ModelStatic<Matches>,
    private teamModel: ModelStatic<Teams>,
  ) {}

  public async getAllMatches(): Promise<IMatch[]> {
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

  public async getInProgress(inProgress: string):Promise<Matches[] | null> {
    const ongoing = await this.matchModel.findAll({
      where: { inProgress: JSON.parse(inProgress.toLowerCase()) },
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
    return ongoing;
  }

  public async closeMatch(id: number):Promise<void> {
    await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateMatch(id: number, team: IUpdate):Promise<void> {
    await this.matchModel.update(
      { homeTeamGoals: team.homeTeamGoals, awayTeamGoals: team.awayTeamGoals },
      { where: { id } },
    );
  }
}

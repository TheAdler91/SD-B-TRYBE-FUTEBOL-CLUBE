import { ModelStatic } from 'sequelize';
import { IAddMatch, IMatch, IUpdate } from '../interfaces';
import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';
import { NotFoundError } from '../error';

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

  public async newMatch(addMatch: IAddMatch): Promise<IMatch> {
    const match = { ...addMatch, inProgress: true };

    const toCreate = await this.matchModel.create(match);
    const created = await this.matchModel.findOne({ where: { id: toCreate.dataValues.id } });

    if (!created) throw new NotFoundError('Return not found');
    return created;
  }
}

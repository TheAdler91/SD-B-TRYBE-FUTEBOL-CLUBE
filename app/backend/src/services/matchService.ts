import { ModelStatic } from 'sequelize';
import { IAddMatch, IMatch, IUpdate } from '../interfaces';
import Matches from '../database/models/MatchModel';
import Teams from '../database/models/TeamModel';
import TeamsService from './teamService';
import { NotFoundError, UprocessableEntityError } from '../error';

export default class MatchService {
  constructor(
    private _matchModel:ModelStatic<Matches>,
    private _teamModel: ModelStatic<Teams>,
    private _teamService: TeamsService,
  ) {}

  public async getAllMatches(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: [
        {
          model: this._teamModel,
          as: 'awayTeam',
        },
        {
          model: this._teamModel,
          as: 'homeTeam',
        }],
    });
    return matches;
  }

  public async getInProgress(inProgress: string):Promise<Matches[] | null> {
    const ongoing = await this._matchModel.findAll({
      where: { inProgress: JSON.parse(inProgress.toLowerCase()) },
      include: [
        {
          model: this._teamModel,
          as: 'awayTeam',
        },
        {
          model: this._teamModel,
          as: 'homeTeam',
        }],
    });
    return ongoing;
  }

  public async closeMatch(id: number):Promise<void> {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateMatch(id: number, team: IUpdate):Promise<void> {
    await this._matchModel.update(
      { homeTeamGoals: team.homeTeamGoals, awayTeamGoals: team.awayTeamGoals },
      { where: { id } },
    );
  }

  public async newMatch(addMatch: IAddMatch): Promise<IMatch> {
    const { homeTeamId, awayTeamId } = addMatch;
    if (homeTeamId === awayTeamId) {
      throw new
      UprocessableEntityError('It is not possible to create a match with two equal teams');
    }

    await this._teamService.findById(homeTeamId);
    await this._teamService.findById(awayTeamId);

    const match = { ...addMatch, inProgress: true };

    const toCreate = await this._matchModel.create(match);
    const created = await this._matchModel.findOne({ where: { id: toCreate.dataValues.id } });

    if (!created) throw new NotFoundError('Return not found');
    return created;
  }
}

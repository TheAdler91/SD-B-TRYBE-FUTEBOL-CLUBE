import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import LeaderBoard from '../database/models/TableHomeModel';

export default class LeaderboardService {
  matchModel: ModelStatic<Matches>;
  teamModel: ModelStatic<Teams>;

  constructor(
    matchModel: ModelStatic<Matches>,
    teamModel: ModelStatic<Teams>,
  ) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  getHomeTeamTable = async () => {
    const { teamModel, matchModel } = this;

    const homeTeams = await teamModel.findAll();
    const homeMatches = await matchModel.findAll();

    const newboard = new LeaderBoard(homeTeams, homeMatches);
    const table = newboard.createBoard();

    const tableSorted = table.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);

    return tableSorted;
  };
}

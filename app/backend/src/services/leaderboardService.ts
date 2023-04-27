import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import LeaderBoard from '../database/models/ChartModel';

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

  getHomeTeam = async () => {
    const leaderboardHomeTeams = await this.teamModel.findAll();
    const leaderboardHomeMatches = await this.matchModel.findAll();
    const newBoard = new LeaderBoard(leaderboardHomeTeams, leaderboardHomeMatches);
    return newBoard.createBoard();
  };
}

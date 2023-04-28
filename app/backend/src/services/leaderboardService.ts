import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import HomeLeaderBoard from '../database/models/TableHomeModel';
import AwayLeaderBoard from '../database/models/TableAwayModel';
import sortTable from '../utils/sortFunc';

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

  getAwayTeamTable = async () => {
    const { teamModel, matchModel } = this;

    const awayTeams = await teamModel.findAll();
    const awayMatches = await matchModel.findAll();

    const newboard = new AwayLeaderBoard(awayTeams, awayMatches);
    const table = newboard.createBoard();

    const awayTableSorted = sortTable(table);

    return awayTableSorted;
  };

  getHomeTeamTable = async () => {
    const { teamModel, matchModel } = this;

    const homeTeams = await teamModel.findAll();
    const homeMatches = await matchModel.findAll();

    const newboard = new HomeLeaderBoard(homeTeams, homeMatches);
    const table = newboard.createBoard();

    const homeTableSorted = sortTable(table);

    return homeTableSorted;
  };
}

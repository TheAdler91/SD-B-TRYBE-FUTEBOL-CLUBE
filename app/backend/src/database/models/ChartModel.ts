import Matches from './MatchModel';
import Teams from './TeamModel';
import TeamStats from './TeamStatsModel';

export default class LeaderBoard {
  private _teams: Teams[];
  private _matches: Matches[];
  private _board;
  constructor(teams: Teams[], matches: Matches[]) {
    this._matches = matches;
    this._teams = teams;
    this._board = this.createBoard();
  }

  public createBoard() {
    return this._teams.map((curTeam) => {
      const teamStatistics = new TeamStats(curTeam, this._matches);
      const {
        getTotalGames,
        getTotalVictories,
        getTotalLosses,
        getTotalDraws,
        getgoalsFavor,
        getgoalsOwn,
        ...statistic } = teamStatistics;

      statistic.totalGames = getTotalGames.call(teamStatistics);
      statistic.totalVictories = getTotalVictories.call(teamStatistics);
      statistic.totalLosses = getTotalLosses.call(teamStatistics);
      statistic.totalDraws = getTotalDraws.call(teamStatistics);
      statistic.goalsFavor = getgoalsFavor.call(teamStatistics);
      statistic.goalsOwn = getgoalsOwn.call(teamStatistics);

      return statistic;
    });
  }
}

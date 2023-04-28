import Matches from './MatchModel';
import Teams from './TeamModel';
import AwayStats from './AwayStatsModel';

export default class AwayLeaderBoard {
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
      const teamStatistics = new AwayStats(curTeam, this._matches);
      const {
        getTotalGames,
        getTotalVictories,
        getTotalLosses,
        getTotalDraws,
        getGoalsFavor,
        getGoalsOwn,
        ...statistic } = teamStatistics;

      statistic.totalGames = getTotalGames.call(teamStatistics);
      statistic.totalVictories = getTotalVictories.call(teamStatistics);
      statistic.totalLosses = getTotalLosses.call(teamStatistics);
      statistic.totalDraws = getTotalDraws.call(teamStatistics);
      statistic.goalsFavor = getGoalsFavor.call(teamStatistics);
      statistic.goalsOwn = getGoalsOwn.call(teamStatistics);

      return statistic;
    });
  }
}

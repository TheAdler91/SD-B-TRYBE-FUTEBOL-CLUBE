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
      const teamStats = new TeamStats(curTeam, this._matches);
      const { getTotalGamesPlayed,
        getTotalWins, getTotalDraws,
        getTotalLosses, getGoalsFor,
        getGoalsAgainst, ...statistic } = teamStats;

      statistic.teamName = teamStats.team.teamName;
      statistic.totalGamesPlayed = getTotalGamesPlayed.call(teamStats);
      statistic.totalWins = getTotalWins.call(teamStats);
      statistic.totalDraws = getTotalDraws.call(teamStats);
      statistic.totalLosses = getTotalLosses.call(teamStats);
      statistic.totalPoints = teamStats.totalPoints;
      statistic.goalsFor = getGoalsFor.call(teamStats);
      statistic.goalsAgainst = getGoalsAgainst.call(teamStats);
      statistic.goalDifference = teamStats.goalDifference;
      statistic.winPercentage = teamStats.winPercentage;

      return statistic;
    });
  }
}

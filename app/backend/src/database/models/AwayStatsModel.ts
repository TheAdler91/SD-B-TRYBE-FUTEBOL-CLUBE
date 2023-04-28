import Matches from './MatchModel';
import Teams from './TeamModel';

export default class AwayStats {
  name: string;
  totalGames: number;
  totalPoints: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
  team: Teams;
  matches: Matches[];

  constructor(team: Teams, matches: Matches[]) {
    this.team = team;
    this.name = team.teamName;
    this.matches = matches;
    this.totalGames = this.getTotalGames();
    this.totalVictories = this.getTotalVictories();
    this.totalLosses = this.getTotalLosses();
    this.totalDraws = this.getTotalDraws();
    this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
    this.goalsFavor = this.getGoalsFavor();
    this.goalsOwn = this.getGoalsOwn();
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;
  }

  private getMatchesForTeam(): Matches[] {
    return this.matches.filter((match) => match.awayTeamId === this.team.id && !match.inProgress);
  }

  getTotalGames() {
    return this.getMatchesForTeam().length;
  }

  getTotalVictories() {
    return this.getMatchesForTeam()
      .filter((match) => match.homeTeamGoals !== null && match.awayTeamGoals > match.homeTeamGoals)
      .length;
  }

  getTotalLosses() {
    return this.getMatchesForTeam()
      .filter((match) => match.homeTeamGoals !== null && match.awayTeamGoals < match.homeTeamGoals)
      .length;
  }

  getTotalDraws() {
    return this.getMatchesForTeam()
      .filter((match) => match
        .homeTeamGoals !== null && match.awayTeamGoals === match.homeTeamGoals)
      .length;
  }

  getGoalsFavor() {
    return this.getMatchesForTeam().reduce((total, match) => total + match.awayTeamGoals, 0);
  }

  getGoalsOwn() {
    return this.getMatchesForTeam().reduce((total, match) => total + match.homeTeamGoals, 0);
  }
}

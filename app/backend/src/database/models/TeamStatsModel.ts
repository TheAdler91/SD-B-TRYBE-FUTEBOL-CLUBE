import Matches from './MatchModel';
import Teams from './TeamModel';

export default class TeamStats {
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
    this.goalsFavor = this.getgoalsFavor();
    this.goalsOwn = this.getgoalsOwn();
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = (this.totalPoints / (this.totalGames * 3)) * 100;
  }

  private getMatchesForTeam(): Matches[] {
    return this.matches.filter((match) => match.homeTeamId === this.team.id && !match.inProgress);
  }

  getTotalGames() {
    return this.getMatchesForTeam().length;
  }

  getTotalVictories() {
    return this.getMatchesForTeam()
      .filter((match) => match.awayTeamGoals !== null && match.homeTeamGoals > match.awayTeamGoals)
      .length;
  }

  getTotalLosses() {
    return this.getMatchesForTeam()
      .filter((match) => match.awayTeamGoals !== null && match.homeTeamGoals < match.awayTeamGoals)
      .length;
  }

  getTotalDraws() {
    return this.getMatchesForTeam()
      .filter((match) => match
        .awayTeamGoals !== null && match.homeTeamGoals === match.awayTeamGoals)
      .length;
  }

  getgoalsFavor() {
    return this.getMatchesForTeam().reduce((total, match) => total + match.homeTeamGoals, 0);
  }

  getgoalsOwn() {
    return this.getMatchesForTeam().reduce((total, match) => total + match.awayTeamGoals, 0);
  }
}

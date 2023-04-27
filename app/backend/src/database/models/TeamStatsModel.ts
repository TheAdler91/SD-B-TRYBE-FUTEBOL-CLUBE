import Matches from './MatchModel';
import Teams from './TeamModel';

export default class TeamStats {
  teamName: string;
  totalGamesPlayed: number;
  totalPoints: number;
  totalWins: number;
  totalDraws: number;
  totalLosses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  winPercentage: number;
  team: Teams;
  matches: Matches[];

  constructor(team: Teams, matches: Matches[]) {
    this.team = team;
    this.teamName = team.teamName;
    this.matches = matches;
    this.totalGamesPlayed = this.getTotalGamesPlayed();
    this.totalWins = this.getTotalWins();
    this.totalLosses = this.getTotalLosses();
    this.totalDraws = this.getTotalDraws();
    this.totalPoints = (this.totalWins * 3) + this.totalDraws;
    this.goalsFor = this.getGoalsFor();
    this.goalsAgainst = this.getGoalsAgainst();
    this.goalDifference = this.goalsFor - this.goalsAgainst;
    this.winPercentage = (this.totalWins / this.totalGamesPlayed) * 100;
  }

  private getMatchesForTeam(): Matches[] {
    return this.matches.filter((match) => match.homeTeamId === this.team.id && !match.inProgress);
  }

  getTotalGamesPlayed() {
    return this.getMatchesForTeam().length;
  }

  getTotalWins() {
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
      .filter((match) =>
        match.awayTeamGoals !== null && match.homeTeamGoals === match.awayTeamGoals)
      .length;
  }

  getGoalsFor() {
    return this.getMatchesForTeam().reduce((total, match) => total + match.homeTeamGoals, 0);
  }

  getGoalsAgainst() {
    return this.getMatchesForTeam().reduce((total, match) => total + match.awayTeamGoals, 0);
  }
}

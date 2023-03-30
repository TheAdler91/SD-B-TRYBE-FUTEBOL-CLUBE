export interface ITeams {
  id: number;
  teamName: string;
}

export default interface ITeamService {
  findAll (): Promise<ITeams[]>
  findById (id: number): Promise<ITeams>
}

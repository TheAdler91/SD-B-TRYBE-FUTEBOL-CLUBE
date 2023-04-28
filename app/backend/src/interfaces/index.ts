import { Request } from 'express';

export interface IRequest extends Request {
  user?: IPayload
}
export interface IPayload {
  id: number,
  username: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IUpdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ITableItem {
  totalPoints: number;
  totalVictories: number;
  goalsBalance: number;
  goalsFavor: number;
}
export interface IAddMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

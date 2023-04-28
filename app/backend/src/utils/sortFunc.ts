import { ITableItem } from '../interfaces';

const sortTable = (table: ITableItem[]) => table.sort((a, b) =>
  b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);

export default sortTable;

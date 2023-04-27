import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Matches',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatches' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayMatches' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });
// Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'home_matches' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'away_matches' });

// Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'home_team' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'away_team' });

export default Matches;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/sequelize.js';

class Report extends Model {}

Report.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('birth_chart', 'compatibility'),
      allowNull: false,
    },
    report_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'reports',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Report;


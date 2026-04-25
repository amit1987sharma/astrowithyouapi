import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/sequelize.js';

class Horoscope extends Model {}

Horoscope.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    zodiac_sign: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    daily: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    weekly: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    monthly: {
      type: DataTypes.TEXT,
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
    tableName: 'horoscopes',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Horoscope;


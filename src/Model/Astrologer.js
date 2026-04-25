import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/sequelize.js';

class Astrologer extends Model {}

Astrologer.init(
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
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price_per_min: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'astrologers',
    timestamps: false,
    freezeTableName: true,
  }
);

export default Astrologer;


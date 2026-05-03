import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/sequelize.js';

class LegalPage extends Model {}

LegalPage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'legal_pages',
    timestamps: false,
    freezeTableName: true,
  }
);

export default LegalPage;

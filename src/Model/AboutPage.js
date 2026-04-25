import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/sequelize.js';

class AboutPage extends Model {}

AboutPage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'About Us',
    },
    subtitle: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
    tableName: 'about_page',
    timestamps: false,
    freezeTableName: true,
  }
);

export default AboutPage;

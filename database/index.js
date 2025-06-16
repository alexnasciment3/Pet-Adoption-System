import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false
});
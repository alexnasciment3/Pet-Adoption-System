// Modelos serão definidos aqui. Use os arquivos de referência Sequelize.

import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

export const Animal = AnimalModel(sequelize);

await sequelize.sync();

export default { sequelize, Animal };

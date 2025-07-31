// Models will be defined here. Use Sequelize reference files.

import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import TutorModel from './Tutor.js';
import QuestionnaireModel from './Questionnaire.js';
import AdoptionRequestModel from './AdoptionRequest.js';
import DonationModel from './Donation.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize);
export const Questionnaire = QuestionnaireModel(sequelize);
export const AdoptionRequest = AdoptionRequestModel(sequelize);
export const Donation = DonationModel(sequelize);

Tutor.hasOne(Questionnaire, { foreignKey: 'tutorId', as: 'questionnaire' });
Questionnaire.belongsTo(Tutor, { foreignKey: 'tutorId' });

await sequelize.sync();

export default { sequelize, Animal, Tutor, Questionnaire, AdoptionRequest, Donation };


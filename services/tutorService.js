import { Tutor, Questionnaire } from '../models/index.js';

export async function createTutorWithQuestionnaire(data) {
    const { questionnaire, ...tutorData } = data;

    const exists = await Tutor.findOne({ where: { email: tutorData.email } });
    if (exists) {
        const error = new Error('Email is already in use.');
        error.status = 400;
        throw error;
    }

    if (!questionnaire || Object.keys(questionnaire).length === 0) {
        const error = new Error('Questionnaire is required.');
        error.status = 400;
        throw error;
    }

    const newTutor = await Tutor.create({
        ...tutorData,
        questionnaire: questionnaire
    }, {
        include: ['questionnaire']
    });

    return newTutor;
}

export async function getTutorWithQuestionnaire(id) {
    const tutor = await Tutor.findByPk(id, {
        include: { model: Questionnaire, as: 'questionnaire' }
    });

    return tutor;
}
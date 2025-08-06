import { Usuario, Questionnaire } from '../models/index.js';

export async function createUsuarioWithQuestionnaire(data) {
    const { questionnaire, ...usuarioData } = data;

    const exists = await Usuario.findOne({ where: { email: usuarioData.email } });
    if (exists) {
        const error = new Error('Email is already in use.');
        error.status = 400;
        throw error;
    }
    if (!usuarioData.administrador) {
        if (!questionnaire || Object.keys(questionnaire).length === 0) {
            const error = new Error('Questionnaire is required.');
            error.status = 400;
            throw error;
        }
    }

    const newUsuario = await Usuario.create({
        ...usuarioData,
        questionnaire: questionnaire
    }, {
        include: ['questionnaire']
    });

    return newUsuario;
}

export async function getUsuarioWithQuestionnaire(id) {
    const usuario = await Usuario.findByPk(id, {
        include: { model: Questionario, as: 'questionnaire' }
    });

    return usuario;
}
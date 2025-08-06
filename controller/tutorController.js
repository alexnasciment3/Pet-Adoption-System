import { createUsuarioWithQuestionnaire, getUsuarioWithQuestionnaire } from '../services/tutorService.js';

export const tutorController = {
    async create(req, res) {
        try {
            const usuario = await createUsuarioWithQuestionnaire(req.body);
            return res.status(201).json(usuario);
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({ error: error.message });
        }
    },

    async findOneWithQuestionnaire(req, res) {
        try {
            const usuario = await getUsuarioWithQuestionnaire(req.params.id);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario not found' });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching usuario data' });
        }
    }
};



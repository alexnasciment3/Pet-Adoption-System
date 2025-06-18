import { createTutorWithQuestionnaire, getTutorWithQuestionnaire } from '../services/tutorService.js';

export const tutorController = {
    async create(req, res) {
        try {
            const tutor = await createTutorWithQuestionnaire(req.body);
            return res.status(201).json(tutor);
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({ error: error.message });
        }
    },

    async findOneWithQuestionnaire(req, res) {
        try {
            const tutor = await getTutorWithQuestionnaire(req.params.id);

            if (!tutor) {
                return res.status(404).json({ error: 'Tutor not found' });
            }

            return res.status(200).json(tutor);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching tutor data' });
        }
    }
};



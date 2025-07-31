import { createAdoptionRequest } from '../services/adoptionService.js';

export const adoptionController = {
    async create(req, res) {
        try {
            const { tutorId, animalId } = req.body;
            const adoption = await createAdoptionRequest(tutorId, animalId);
            return res.status(201).json(adoption);
        } catch (error) {
            console.error(error);
            const status = error.status || 500;
            return res.status(status).json({ error: error.message });
        }
    },

};
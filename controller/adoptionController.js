import { createAdoptionRequest, deleteAdoptionRequest } from '../services/adoptionService.js';

export const adoptionController = {
    async create(req, res) {
        try {
            const { tutorId, animalId } = req.body;
            const adoption = await createAdoptionRequest(tutorId, animalId);
            return res.status(201).json(adoption);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating adoption request' });
        }
    },

    async remove(req, res) {
        try {
            const success = await deleteAdoptionRequest(req.params.id);
            if (!success) return res.status(404).json({ error: 'Adoption request not found' });
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error deleting adoption request' });
        }
    }
};
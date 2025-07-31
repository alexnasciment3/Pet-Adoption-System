import { createAnimal, listAnimals } from '../services/animalService.js';

export const animalController = {
    async create(req, res) {
        try {
            const newAnimal = await createAnimal(req.body, req.file?.buffer);
            return res.status(201).json(newAnimal);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'Internal error while creating the animal.';
            return res.status(status).json({ error: message });
        }
    },

    async list(req, res) {
        try {
            const result = await listAnimals(req.query);
            return res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error while fetching animals.' });
        }
    }
};

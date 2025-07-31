import { registerDonation } from '../services/donationService.js';

export const donationController = {
    async create(req, res) {
        try {
            const result = await registerDonation(req.body);
            return res.status(201).json(result);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'Error processing donation';
            return res.status(status).json({ error: message });
        }
    }
};
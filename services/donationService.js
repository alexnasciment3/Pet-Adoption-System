// import { Donation } from '../models/Modelos.js';

// export async function registerDonation({ name, email, amount, message }) {
//     if (!amount || typeof amount !== 'number' || amount <= 0) {
//         throw { status: 400, message: 'Donation amount is required and must be a positive number' };
//     }

//     const donation = await Donation.create({ name, email, amount, message });

//     return {
//         donation_id: donation.id,
//         amount: donation.amount,
//         message: donation.message,
//     };
// }
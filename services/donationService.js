import { Donation } from '../models/index.js';
import QRCode from 'qrcode';

export async function registerDonation({ name, email, amount, message }) {
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        throw { status: 400, message: 'Donation amount is required and must be a positive number' };
    }

    const qrContent = `Donor: ${name}\nAmount: R$ ${amount}`;
    const qrcode = await QRCode.toDataURL(qrContent);

    const donation = await Donation.create({ name, email, amount, message, qrcode });

    return {
        donation_id: donation.id,
        amount: donation.amount,
        message: donation.message,
        qrcode: donation.qrcode
    };
}
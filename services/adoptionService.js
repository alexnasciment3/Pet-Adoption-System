import { AdoptionRequest, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

export async function createAdoptionRequest(tutorId, animalId) {

    const count = await AdoptionRequest.count({ where: { animalId } });
    const newRequest = await AdoptionRequest.create({
        tutorId,
        animalId,
        queuePosition: count + 1
    });
    return newRequest;
}

export async function deleteAdoptionRequest(id) {
    const request = await AdoptionRequest.findByPk(id);
    if (!request) return false;

    const { animalId, queuePosition } = request;

    await request.destroy();

    await AdoptionRequest.update(
        { queuePosition: sequelize.literal('queuePosition - 1') },
        {
            where: {
                animalId,
                queuePosition: { [Op.gt]: queuePosition }
            }
        }
    );
    return true;
}
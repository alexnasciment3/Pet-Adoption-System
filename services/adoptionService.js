// import { Questionario, Usuario, Animal, sequelize } from '../models/Modelos.js';

// export async function createAdoptionRequest(tutorId, animalId) {

//     const tutor = await Tutor.findByPk(tutorId);
//     if (!tutor) {
//         const error = new Error('Tutor not found');
//         error.status = 404;
//         throw error;
//     }

//     const animal = await Animal.findByPk(animalId);
//     if (!animal) {
//         const error = new Error('Animal not found');
//         error.status = 404;
//         throw error;
//     }

//     const existing = await AdoptionRequest.findOne({
//         where: { tutorId, animalId, status: 'em_analise' }
//     });
//     if (existing) {
//         const error = new Error('This tutor already has an active request for this animal');
//         error.status = 409;
//         throw error;
//     }

//     const count = await AdoptionRequest.count();
//     const newRequest = await AdoptionRequest.create({
//         tutorId,
//         animalId,
//         queuePosition: count + 1
//     });

//     return newRequest;
// }




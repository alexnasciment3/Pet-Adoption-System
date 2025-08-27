import { Animal } from '../models/modelos.js';

export async function createAnimal(data, imageBuffer) {
    const { nome, especie, porte, castrado, vacinado, descricao } = data;

    if (!nome || !especie || !porte || castrado === undefined || vacinado === undefined || !descricao) {
        const error = new Error('All required fields must be filled in correctly.');
        error.status = 400;
        throw error;
    }

    const newAnimal = await Animal.create({
        nome,
        especie,
        porte,
        castrado: castrado === 'true' || castrado === true,
        vacinado: vacinado === 'true' || vacinado === true,
        descricao: descricao?.trim(),
        foto: imageBuffer || null,
    });

    return newAnimal;
}

export async function listAnimals(filters) {
    const where = {};

    if (filters.species) {
        where.species = filters.species;
    }

    if (filters.size) {
        where.size = filters.size;
    }

    if (filters.neutered !== undefined) {
        where.neutered = filters.neutered === 'true';
    }

    if (filters.vaccinated !== undefined) {
        where.vaccinated = filters.vaccinated === 'true';
    }

    const animals = await Animal.findAll({
        where,
        order: [['createdAt', 'ASC']],
    });

    return {
        data: animals,
        total: animals.length,
    };
}

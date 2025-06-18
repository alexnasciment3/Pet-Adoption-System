import { Animal } from '../models/index.js';

export async function createAnimal(data, imageBuffer) {
    const { name, species, size, neutered, vaccinated, description } = data;

    if (!name || !species || !size || neutered === undefined || vaccinated === undefined || !description) {
        const error = new Error('All required fields must be filled in correctly.');
        error.status = 400;
        throw error;
    }

    const newAnimal = await Animal.create({
        name,
        species,
        size,
        neutered: neutered === 'true' || neutered === true,
        vaccinated: vaccinated === 'true' || vaccinated === true,
        description: description?.trim(),
        photo: imageBuffer || null,
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

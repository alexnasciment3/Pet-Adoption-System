import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const AdoptionRequest = sequelize.define('AdoptionRequest', {
        status: {
            type: DataTypes.STRING,
            defaultValue: 'em_analise'
        },
        queuePosition: DataTypes.INTEGER,
        tutorId: { type: DataTypes.INTEGER, allowNull: false },
        animalId: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'adoption_requests',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false
    });

    return AdoptionRequest;
};
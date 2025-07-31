import { DataTypes } from 'sequelize';

export default (sequelize) => {
    return sequelize.define('Animal', {
        name: { type: DataTypes.STRING, allowNull: false },
        species: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        neutered: { type: DataTypes.BOOLEAN, allowNull: false },
        vaccinated: { type: DataTypes.BOOLEAN, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        photo: { type: DataTypes.BLOB('long') },
    }, {
        tableName: 'animals',
        timestamps: true,
    });
};

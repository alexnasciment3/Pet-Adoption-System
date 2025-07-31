import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Tutor = sequelize.define('Tutor', {
        fullName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        city: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        instagram: { type: DataTypes.STRING },
        facebook: { type: DataTypes.STRING }
    }, {
        tableName: 'tutors',
        timestamps: true
    });

    return Tutor;
};
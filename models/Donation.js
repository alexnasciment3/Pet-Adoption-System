import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Donation = sequelize.define('Donation', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    message: { type: DataTypes.STRING },
    qrcode: { type: DataTypes.TEXT }
  }, {
    tableName: 'donations',
    timestamps: true
  });

  return Donation;
};
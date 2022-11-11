import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Car extends Model {}

Car.init({
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: {
    type: DataTypes.ENUM('FIAT', 'VOLKSWAGEN', 'CHEVROLET', 'TOYOTA', 'MERCEDES'),
    allowNull: false
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize
});

export default Car;

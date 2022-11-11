import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Location from './Location.js';

class Car extends Model {}

Car.init({
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING,
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

Car.hasMany(Location, {
  onDelete: 'RESTRICT'
});

export default Car;

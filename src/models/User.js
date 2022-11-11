import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Location from './Location.js';

class User extends Model {}

User.init({
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nascimento: DataTypes.DATE,
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NORMAL'
  }
}, {
  sequelize
});

User.hasMany(Location, {
  onDelete: 'RESTRICT'
});

export default User;

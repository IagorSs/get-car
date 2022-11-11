import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Location extends Model {}

Location.init({
  locatedData: {
    type: DataTypes.DATE,
    allowNull: false
  },
  locatedTimeDays: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize
});

export default Location;

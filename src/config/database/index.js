import { Sequelize } from 'sequelize';
import dbData from './dbData.js';

const connection = new Sequelize(dbData);

export default connection;

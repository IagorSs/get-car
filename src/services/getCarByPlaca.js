import CarModel from '../models/Car.js';

export default (placa) => CarModel.findOne({ where: { placa } });

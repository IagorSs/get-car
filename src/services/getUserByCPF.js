import UserModel from '../models/User.js';

export default (cpf) => UserModel.findOne({ where: { cpf } });

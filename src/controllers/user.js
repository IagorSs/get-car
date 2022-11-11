import UserModel from '../models/User.js';

const isUserModelValid = (userModel) => {
  return typeof(userModel.cpf) === 'string'
    && typeof(userModel.nome) === 'string'
    && typeof(userModel.email) === 'string'
    && typeof(userModel.password) === 'string';
}

const getUserByEmail = (email) => UserModel.findOne({ where: { email } });

const getUserByCPF = (cpf) => UserModel.findOne({ where: { cpf } });

export const register = async (req, res) => {
  const userData = req.body;

  if (!isUserModelValid(userData)) return res
    .status(400)
    .json({
      message: "Invalid request body"
    });

  if (await getUserByEmail(userData.email)) return res
    .status(409)
    .json({
      message: "Email already exists in database"
    });

  if (await getUserByCPF(userData.cpf)) return res
    .status(409)
    .json({
      message: "CPF already exists in database"
    });

  const user = await UserModel.create(userData);

  delete user.password;

  return res.status(201).json(user);
}

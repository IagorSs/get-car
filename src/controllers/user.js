import UserModel from '../models/User.js';

const isEmailFormatted = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
}

const isCPFFormatted = (cpf) => {
  return cpf
    .match(
      /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/
    ) !== null;
}

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

  if(!isEmailFormatted(userData.email)) return res
    .status(400)
    .json({
      message: "Unformatted email"
    });

  if(!isCPFFormatted(userData.cpf)) return res
    .status(400)
    .json({
      message: "Unformatted cpf"
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

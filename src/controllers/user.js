import UserModel from '../models/User.js';
import getUserByCPF from '../services/getUserByCPF.js';
import isCPFFormatted from '../utils/isCPFFormatted.js';

const isEmailFormatted = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
}

const isUserModelValid = (userModel) => {
  return typeof(userModel.cpf) === 'string'
    && typeof(userModel.nome) === 'string'
    && typeof(userModel.email) === 'string'
    && typeof(userModel.password) === 'string';
}

const isTipoValid = (tipo) => {
  return typeof(tipo) === 'string'
    && ['ADMIN', 'NORMAL'].includes(tipo);
}

const getUserByEmail = (email) => UserModel.findOne({ where: { email } });

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

  if(userData.tipo && !isTipoValid(userData.tipo)) return res
    .status(400)
    .json({
      message: "Invalid tipo"
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

  return res.status(201).json(user);
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res
    .status(400)
    .json({
      message: "Invalid request body"
    });

  if(!isEmailFormatted(email)) return res
    .status(400)
    .json({
      message: "Unformatted email"
    });

  const user = await getUserByEmail(email);

  if (!user) return res
    .status(401)
    .json({
      message: "Incorrect email"
    });

  if (user.password !== password) return res
    .status(401)
    .json({
      message: "Incorrect password"
    });

  req.session.loggedin = true;
  req.session.email = email;
  req.session.tipo = user.tipo;

  res.status(200).json({ userType: user.tipo });
}

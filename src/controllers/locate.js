import isPlacaFormatted from '../utils/isPlacaFormatted.js';
import getCarByPlaca from '../services/getCarByPlaca.js';
import isCPFFormatted from '../utils/isCPFFormatted.js';
import getUserByCPF from '../services/getUserByCPF.js';
import LocationModel from '../models/Location.js';

export const locate = async (req, res) => {
  const { cpf, placa, value, locatedData, locatedTimeDays } = req.body;

  if(!req.session.loggedin) return res
    .status(401)
    .json({
      message: "You're not logged"
    });

  if(req.session.tipo !== 'ADMIN') return res
    .status(403)
    .json({
      message: "You don't have permission to do this"
    });

  if (
    typeof cpf !== 'string'
    || typeof placa !== 'string'
    || typeof value !== 'number'
    || (typeof locatedData !== 'string' || locatedData.match(/^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/) === null)
    || typeof locatedTimeDays !== 'number'
  ) return res
    .status(400)
    .json({
      message: "Invalid request body"
    });

  if(!isPlacaFormatted(placa)) return res
    .status(400)
    .json({
      message: "Unformatted placa"
    });

  if(!isCPFFormatted(cpf)) return res
    .status(400)
    .json({
      message: "Unformatted cpf"
    });

  const car = await getCarByPlaca(placa);

  if (car === null) return res
    .status(404)
    .json({
      message: "Car doesn't exists in database"
    });

  const user = await getUserByCPF(cpf);

  if (user === null) return res
    .status(404)
    .json({
      message: "User doesn't exists in database"
    });

  if (!car.disponivel) return res
    .status(409)
    .json({
      message: "Car can't be located because already is located"
    });

  const location = await LocationModel.create({
    UserId: user.id,
    CarId: car.id,
    ...req.body
  });

  car.disponivel = false;
  car.save();

  return res.status(201).json(location);
}

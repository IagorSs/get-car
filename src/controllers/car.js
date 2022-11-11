import CarModel from '../models/Car.js';

const isPlacaFormatted = (placa) => {
  return placa
    .match(
      /^[A-Z]{3}[0-9][A-Z][0-9]{2}$|^[A-Z]{3}-[0-9]{4}$/
    ) !== null;
}

const isCarModelValid = (carModel) => {
  return typeof(carModel.modelo) === 'string'
    && typeof(carModel.marca) === 'string' && ['FIAT', 'VOLKSWAGEN', 'CHEVROLET', 'TOYOTA', 'MERCEDES'].includes(carModel.marca)
    && typeof(carModel.disponivel) === 'boolean'
    && typeof(carModel.placa) === 'string';
}

const getCarByPlaca = (placa) => CarModel.findOne({ where: { placa } });

export const register = async (req, res) => {
  const carData = req.body;

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

  if (!isCarModelValid(carData)) return res
    .status(400)
    .json({
      message: "Invalid request body"
    });

  if(!isPlacaFormatted(carData.placa)) return res
    .status(400)
    .json({
      message: "Unformatted placa"
    });

  if (await getCarByPlaca(carData.placa)) return res
    .status(409)
    .json({
      message: "Placa already exists in database"
    });

  const car = await CarModel.create(carData);

  return res.status(201).json(car);
}

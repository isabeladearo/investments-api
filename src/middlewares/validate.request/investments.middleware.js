const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const investmentsSchema = Joi.object({
  codCliente: Joi.number().strict().integer().required(),
  codAtivo: Joi.number().strict().integer().required(),
  qtdeAtivo: Joi.number().strict().integer().min(1)
    .required(),
});

const handleError = (error) => {
  const { type } = error.details[0];

  const MISSING_TYPES = [
    'any.required',
    'number.base',
    'number.integer',
    'number.min',
  ];

  if (MISSING_TYPES.includes(type)) {
    return 'Alguns campos obrigatórios estão faltando';
  }

  return error.message;
};

module.exports = async (req, res, next) => {
  const { error } = investmentsSchema.validate(req.body);

  if (!error) return next();

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: handleError(error) });
};

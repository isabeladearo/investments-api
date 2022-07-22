const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const registerSchema = Joi.object({
  nome: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

const handleError = (error) => {
  const { type } = error.details[0];

  const MISSING_TYPES = [
    'any.required',
    'string.base',
    'string.empty',
    'string.email',
    'string.min',
  ];

  if (MISSING_TYPES.includes(type)) {
    return 'Alguns campos obrigatórios estão faltando';
  }

  return error.message;
};

module.exports = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (!error) return next();

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: handleError(error) });
};

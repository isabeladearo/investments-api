const { Cliente } = require('../database/models');
const { generateJWTToken } = require('../helpers/JWTToken');
const { StatusCodes } = require('http-status-codes');

const authenticateLogin = async ({ email, senha }) => {
  if (!email || !senha) {
    throw { status: StatusCodes.UNAUTHORIZED, message: 'Campos faltantes' };
  }

  const client = await Cliente.findOne({
    where: { email, senha },
    attributes: { exclude: ['senha', 'saldo'] },
  });

  if (!client) {
    throw { status: StatusCodes.UNAUTHORIZED, message: 'Cliente ou senha inválida' };
  }

  const payload = {
    codCliente: client.dataValues.codCliente,
    nome: client.dataValues.nome,
    email: client.dataValues.email,
  }

  const token = generateJWTToken(payload);
  return { token };
};

module.exports = {
  authenticateLogin,
};

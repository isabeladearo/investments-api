const { StatusCodes } = require('http-status-codes');
const { Cliente } = require('../database/models');
const { generateJWTToken } = require('../helpers/JWTToken');

const registerNewClient = async ({ nome, email, senha }) => {
  const [client, created] = await Cliente.findOrCreate({
    where: { nome, email, senha },
    defaults: { nome, email, senha },
    attributes: { exclude: ['senha', 'saldo'] },
  });

  if (!created) {
    throw new Error({
      status: StatusCodes.CONFLICT,
      message: 'Cliente já cadastrado',
    });
  }

  const payload = {
    codCliente: client.dataValues.codCliente,
    nome: client.dataValues.nome,
    email: client.dataValues.email,
  };

  const token = generateJWTToken(payload);

  return { token };
};

module.exports = { registerNewClient };

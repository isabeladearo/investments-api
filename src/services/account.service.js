const { Cliente } = require('../database/models');
const { StatusCodes } = require('http-status-codes');

const findClient = async (codCliente) =>
  await Cliente.findOne({
    where: { codCliente },
    attributes: { exclude: ['senha'] },
  });

const createDeposit = async ({ codCliente, valor }) => {
  const client = await findClient(codCliente);

  if (!client) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: 'Cliente não encontrado',
    };
  }

  await client.increment({ saldo: valor });

  return client;
};

module.exports = { createDeposit };

const { Cliente } = require('../database/models');
const { StatusCodes } = require('http-status-codes');

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const findClient = async (codCliente) => await Cliente.findOne({
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

  const clientUpdated = await findClient(codCliente);
  return clientUpdated;
};

const createWithdraw = async ({ codCliente, valor }) => {
  const client = await Cliente.findOne({
    where: { codCliente, saldo: { [Op.gt]: valor } },
    attributes: { exclude: ['senha'] },
  });

  if (!client) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: 'Não foi possível realizar a operação',
    };
  }

  await client.increment({ saldo: valor * -1 });

  const clientUpdated = await findClient(codCliente);
  return clientUpdated;
}

const getByCodClient = async (codCliente) => {
  const client = await await Cliente.findOne({
    attributes: ['saldo'],
    where: { codCliente },
  });

  if (!client) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: 'Cliente não encontrado',
    };
  }

  return { codCliente, saldo: client.dataValues.saldo };
}

module.exports = { createDeposit, createWithdraw, getByCodClient };

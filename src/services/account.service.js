const { StatusCodes } = require('http-status-codes');

const Sequelize = require('sequelize');
const { Cliente } = require('../database/models');

const { Op } = Sequelize;

const findClient = (codCliente) => Cliente.findOne({
  where: { codCliente },
  attributes: { exclude: ['senha'] },
});

const createDeposit = async ({ codCliente, valor }) => {
  const client = await Cliente.findOne({
    where: { codCliente },
    attributes: { exclude: ['senha'] },
  });

  if (!client) {
    throw new Error({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Cliente não encontrado',
    });
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
    throw new Error({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Não foi possível realizar a operação',
    });
  }

  await client.increment({ saldo: valor * -1 });

  const clientUpdated = await findClient(codCliente);
  return clientUpdated;
};

const getByCodClient = async (codCliente) => {
  const client = await await Cliente.findOne({
    attributes: ['saldo'],
    where: { codCliente },
  });

  if (!client) {
    throw new Error({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Cliente não encontrado',
    });
  }

  return {
    codCliente: Number(codCliente),
    saldo: Number(client.dataValues.saldo),
  };
};

module.exports = { createDeposit, createWithdraw, getByCodClient };

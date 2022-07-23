const Sequelize = require('sequelize');
const { Cliente } = require('../database/models');

const { Op } = Sequelize;

const findClient = (codCliente) => Cliente.findOne({
  where: { codCliente },
  attributes: { exclude: ['senha'] },
});

const createDeposit = async ({ codCliente, valor }) => {
  const client = await findClient(codCliente);

  if (!client) return false;

  await client.increment({ saldo: valor });

  const clientUpdated = await findClient(codCliente);
  return clientUpdated;
};

const createWithdraw = async ({ codCliente, valor }) => {
  const client = await Cliente.findOne({
    where: { codCliente, saldo: { [Op.gt]: valor } },
    attributes: { exclude: ['senha'] },
  });

  if (!client) return false;

  await client.increment({ saldo: valor * -1 });

  const clientUpdated = await findClient(codCliente);
  return clientUpdated;
};

const getAccountByCodClient = async (codCliente) => {
  const validate = /^\d+$/g.test(codCliente);

  if (!validate) return false;

  const client = await await Cliente.findOne({
    attributes: ['saldo'],
    where: { codCliente },
  });

  if (!client) return false;

  return {
    codCliente: Number(codCliente),
    saldo: Number(client.dataValues.saldo),
  };
};

module.exports = { createDeposit, createWithdraw, getAccountByCodClient };

const { StatusCodes } = require('http-status-codes');
const { accountService } = require('../services');

const createDeposit = async (req, res) => {
  const deposit = await accountService.createDeposit(req.body);

  if (!deposit) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Cliente não encontrado' });

  return res.status(StatusCodes.CREATED).json(deposit);
};

const createWithdraw = async (req, res) => {
  const withdraw = await accountService.createWithdraw(req.body);

  if (!withdraw) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Não foi possível realizar a operação' });

  return res.status(StatusCodes.CREATED).json(withdraw);
};

const getAccountByCodClient = async (req, res) => {
  const client = await accountService.getAccountByCodClient(req.params.id);

  if (!client) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cliente não encontrado' });

  return res.status(StatusCodes.OK).json(client);
};

module.exports = { createDeposit, createWithdraw, getAccountByCodClient };

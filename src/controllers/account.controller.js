const { StatusCodes } = require('http-status-codes');
const { accountService } = require('../services');

const createDeposit = async (req, res) => {
  const deposit = await accountService.createDeposit(req.body, req.auth);

  if (!deposit) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Não foi possível realizar a operação' });
  }

  return res.status(StatusCodes.ACCEPTED).json(deposit);
};

const createWithdraw = async (req, res) => {
  const withdraw = await accountService.createWithdraw(req.body, req.auth);

  if (!withdraw) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Não foi possível realizar a operação' });
  }

  return res.status(StatusCodes.ACCEPTED).json(withdraw);
};

const getAccountByCodClient = async (req, res) => {
  const client = await accountService.getAccountByCodClient(
    req.params.id,
    req.auth,
  );

  if (!client) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Não foi possível realizar a operação' });
  }

  return res.status(StatusCodes.OK).json(client);
};

module.exports = { createDeposit, createWithdraw, getAccountByCodClient };

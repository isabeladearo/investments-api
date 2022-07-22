const { accountService } = require('../services');
const { StatusCodes } = require('http-status-codes');

const createDeposit = async (req, res) => {
  const deposit = await accountService.createDeposit(req.body);

  return res.status(StatusCodes.CREATED).json(deposit);
}

const createWithdraw = async (req, res) => {
  const withdraw = await accountService.createWithdraw(req.body);

  return res.status(StatusCodes.CREATED).json(withdraw);
}

module.exports = { createDeposit, createWithdraw };

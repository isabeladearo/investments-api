const { assetsService } = require('../services');
const { StatusCodes } = require('http-status-codes');

const getInvestments = async (req, res) => {
  const investments = await assetsService.getInvestments(req.params.id);

  return res.status(StatusCodes.OK).json(investments);
}

module.exports = { getInvestments };

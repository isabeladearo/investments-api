const { investmentsService } = require('../services');
const { StatusCodes } = require('http-status-codes');

const buyAsset = async (req, res) => {
  const investment = await investmentsService.buyAsset(req.body);

  return res.status(StatusCodes.CREATED).json(investment);
}

const sellAsset = async (req, res) => {
  const investment = await investmentsService.sellAsset(req.body);
  
  return res.status(StatusCodes.CREATED).json(investment);
}

module.exports = { buyAsset, sellAsset };
